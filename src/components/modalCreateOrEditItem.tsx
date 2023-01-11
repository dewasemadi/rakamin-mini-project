import { useState } from 'react'
import TextField from './textField'
import BaseButton from './baseButton'
import CloseIcon from 'assets/close.svg'
import { useQueryClient, useMutation } from 'react-query'
import { joiResolver } from '@hookform/resolvers/joi'
import { createItemsById, updateItemsById } from 'services/itemService'
import { useForm } from 'react-hook-form'
import Joi from 'joi'
import { Show } from './show'
import Spinner from './spinner'
import ModalBase from './modalBase'
import { removeCharInString } from 'utils/formatter'

interface ModalCreateOrEditItemProps {
  todoId: number
  itemId?: number
  isEdit?: boolean
  name?: string
  progress_percentage?: number
  onCloseModal: () => void
  onCloseDropdown?: () => void
}

const createOrEditItemSchema = Joi.object({
  name: Joi.string().required(),
  progress_percentage: Joi.string().required(),
})

interface TCreateOrEditItem {
  name: string
  progress_percentage: string
}

export default function ModalCreateOrEditItem(props: ModalCreateOrEditItemProps) {
  const { todoId, itemId = 0, isEdit = false, name, progress_percentage, onCloseModal, onCloseDropdown } = props
  const [currentName] = useState(name ? name : '')
  const [currentProgress] = useState(progress_percentage ? progress_percentage : 0)
  const queryClient = useQueryClient()
  const createItemMutation = useMutation(createItemsById)
  const editItemMutation = useMutation(updateItemsById)

  const defaultValues = {
    name: name ? name : '',
    progress_percentage: progress_percentage ? `${progress_percentage.toString()}%` : '',
  }
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: joiResolver(createOrEditItemSchema),
  })
  const onSubmit = ({ name, progress_percentage }: TCreateOrEditItem) => {
    if (!todoId) {
      alert('Something went wrong!')
      return
    }
    const progress = removeCharInString(progress_percentage, '%')

    if (progress === 'not-a-number') {
      setError('progress_percentage', {
        type: 'manual',
        message: 'Progress must be a number',
      })
      return
    }

    if (progress > 100 || progress < 0) {
      setError('progress_percentage', {
        type: 'manual',
        message: 'Progress must be between 0% and 100%',
      })
      return
    }

    if (isEdit) {
      // don't make an api call if there is no input change
      if (currentName === name && currentProgress === progress) {
        onCloseModal()
        onCloseDropdown?.()
        return
      }
      const editItemPayload = {
        todoId: todoId,
        itemId: itemId,
        name: name,
        target_todo_id: todoId,
        progress_percentage: progress,
      }
      editItemMutation.mutate(editItemPayload, {
        onSuccess: () => {
          queryClient.invalidateQueries(['items', todoId])
          onCloseModal()
          onCloseDropdown?.()
        },
      })
    } else {
      const createItemPayload = {
        todoId: todoId,
        name: name,
        progress_percentage: progress,
      }
      createItemMutation.mutate(createItemPayload, {
        onSuccess: () => {
          queryClient.invalidateQueries(['items', todoId])
          onCloseModal()
          onCloseDropdown?.()
        },
      })
    }
  }

  return (
    <ModalBase onCloseModal={onCloseModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*header*/}
        <div className='flex items-center justify-between p-5 rounded-t'>
          <h3 className='text-lg font-semibold'>{isEdit ? 'Edit Task' : 'Create Task'}</h3>
          <BaseButton
            variant='text'
            startIcon={CloseIcon}
            className='hover:bg-neutral-30 px-1'
            onClick={onCloseModal}
          />
        </div>
        {/*body*/}
        <div className='relative py-1 px-6 flex-auto'>
          <TextField
            name='name'
            control={control}
            label='Name'
            type='text'
            placeholder='type your task'
            errorMessage={errors.name?.message}
          />

          <TextField
            name='progress_percentage'
            control={control}
            label='Progress'
            type='text'
            placeholder='70%'
            className='md:w-[50%] mt-5'
            errorMessage={errors.progress_percentage?.message}
          />
        </div>
        {/*footer*/}
        <div className='flex items-center justify-end p-6 rounded-b gap-3'>
          <BaseButton variant='neutral' type='button' onClick={onCloseModal}>
            Cancel
          </BaseButton>

          <Show when={isEdit ? editItemMutation.isLoading : createItemMutation.isLoading}>
            <Spinner />
          </Show>
          <Show when={isEdit ? !editItemMutation.isLoading : !createItemMutation.isLoading}>
            <BaseButton type='submit' className='border-2 border-primary hover:border-primary-dark'>
              Save Task
            </BaseButton>
          </Show>
        </div>
      </form>
    </ModalBase>
  )
}
