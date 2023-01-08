import TextField from './textField'
import BaseButton from './baseButton'
import CloseIcon from 'assets/close.svg'
import { useQueryClient, useMutation } from 'react-query'
import { createTodo, TTodo } from 'services/todoService'
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm, Controller } from 'react-hook-form'
import Joi from 'joi'
import MultilineTextField from './multilineTextField'
import { Show } from './show'
import Spinner from './spinner'
import ModalBase from './modalBase'

interface ModalAddGroupProps {
  onCloseModal: () => void
}

const defaultValues = {
  title: '',
  description: '',
}

const createTodoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
})

export default function ModalAddGroup({ onCloseModal }: ModalAddGroupProps) {
  const queryClient = useQueryClient()
  const { mutate, reset, isLoading } = useMutation(createTodo, {
    onSuccess: () => {
      reset()
      queryClient.invalidateQueries('todos')
      onCloseModal()
    },
  })
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: joiResolver(createTodoSchema),
  })
  const onSubmit = (data: TTodo) => mutate(data)

  return (
    <ModalBase onCloseModal={onCloseModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*header*/}
        <div className='flex items-center justify-between p-5 rounded-t'>
          <h3 className='text-lg font-semibold'>Add New Group</h3>
          <BaseButton
            variant='text'
            startIcon={CloseIcon}
            className='hover:bg-neutral-30 px-1'
            onClick={onCloseModal}
          />
        </div>
        {/*body*/}
        <div className='relative py-1 px-6 flex-auto'>
          <Controller
            name='title'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Title'
                type='text'
                placeholder='title'
                errorMessage={errors.title?.message}
              />
            )}
          />

          <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <MultilineTextField
                {...field}
                label='Description'
                placeholder='description'
                className='mt-5'
                rows={3}
                errorMessage={errors.description?.message}
              />
            )}
          />
        </div>
        {/*footer*/}
        <div className='flex items-center justify-end p-6 rounded-b gap-3'>
          <BaseButton variant='neutral' type='button' onClick={onCloseModal}>
            Cancel
          </BaseButton>

          <Show when={isLoading}>
            <Spinner />
          </Show>
          <Show when={!isLoading}>
            <BaseButton type='submit' className='border-2 border-primary hover:border-primary-dark'>
              Submit
            </BaseButton>
          </Show>
        </div>
      </form>
    </ModalBase>
  )
}
