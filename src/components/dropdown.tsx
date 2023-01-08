import { Show } from './show'
import { useState } from 'react'
import ArrowRightIcon from 'assets/arrow-right.svg'
import ArrowLeftIcon from 'assets/arrow-left.svg'
import EditIcon from 'assets/edit-alt.svg'
import TrashIcon from 'assets/trash-alt.svg'
import HoverArrowRightIcon from 'assets/hover-arrow-right.svg'
import HoverArrowLeftIcon from 'assets/hover-arrow-left.svg'
import HoverEditIcon from 'assets/hover-edit-alt.svg'
import HoverTrashIcon from 'assets/hover-trash-alt.svg'
import BaseButton from './baseButton'
import { getPropertyValueByIdx } from 'utils/identifier'
import { useMutation, useQueryClient } from 'react-query'
import { deleteItemsById, updateItemsById } from 'services/itemService'
import ModalCreateOrEditItem from './modalCreateOrEditItem'
import ModalDelete from './modalDelete'

interface DropdownProps {
  todosData: any
  todoId: number
  itemId: number
  currentIdx: number
  name?: string
  progress_percentage?: number
  onCloseDropdown: () => void
}

export default function Dropdown(props: DropdownProps) {
  const queryClient = useQueryClient()
  const { todosData, todoId, itemId, currentIdx, name, progress_percentage, onCloseDropdown } = props
  const [arrowRight, setArrowRight] = useState(ArrowRightIcon)
  const [arrowLeft, setArrowLeft] = useState(ArrowLeftIcon)
  const [edit, setEdit] = useState(EditIcon)
  const [trash, setTrash] = useState(TrashIcon)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const deleteMutation = useMutation(deleteItemsById)
  const updateMutation = useMutation(updateItemsById)

  const onOpenEditModal = () => {
    setIsShowEditModal(true)
  }

  const onCloseEditModal = () => {
    setIsShowEditModal(false)
  }

  const onOpenDeleteModal = () => {
    setIsShowDeleteModal(true)
  }

  const onCloseDeleteModal = () => {
    setIsShowDeleteModal(false)
  }

  const onDeleteClicked = () => {
    setIsShowDeleteModal(true)
    if (!todoId || !itemId) {
      alert('Something went wrong!')
      return
    }
    const payload = {
      todoId,
      itemId,
    }
    deleteMutation.mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries(['items', todoId])
        setIsShowDeleteModal(false)
        onCloseDropdown()
      },
    })
  }

  const onMoveClicked = (key: 'prev' | 'next') => {
    const targetId = getPropertyValueByIdx(todosData, 'id', currentIdx, key)
    if (!todoId || !itemId || targetId === -1) {
      alert('Something went wrong!')
      return
    }
    const payload = {
      todoId,
      itemId,
      target_todo_id: targetId,
      name: name || '',
      progress_percentage: progress_percentage || 0,
    }
    updateMutation.mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries(['items', todoId])
        queryClient.invalidateQueries(['items', targetId])
        onCloseDropdown()
      },
    })
  }

  return (
    <div>
      <div
        className={`${
          currentIdx === todosData?.length - 1 ? 'right-0' : 'left-0'
        } absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        role='menu'
        aria-orientation='vertical'
        aria-labelledby='menu-button'
        tabIndex={-1}
      >
        <div className='py-2' role='none'>
          <Show when={currentIdx !== todosData?.length - 1}>
            <BaseButton
              variant='text'
              startIcon={arrowRight}
              className='font-semibold w-full py-3 hover:text-primary'
              imgClassName='mr-3'
              onClick={() => onMoveClicked('next')}
              onMouseOver={() => setArrowRight(HoverArrowRightIcon)}
              onMouseOut={() => setArrowRight(ArrowRightIcon)}
            >
              Move Right
            </BaseButton>
          </Show>
          <Show when={currentIdx !== 0}>
            <BaseButton
              variant='text'
              startIcon={arrowLeft}
              className='font-semibold w-full py-3 hover:text-primary'
              imgClassName='mr-3'
              onClick={() => onMoveClicked('prev')}
              onMouseOver={() => setArrowLeft(HoverArrowLeftIcon)}
              onMouseOut={() => setArrowLeft(ArrowLeftIcon)}
            >
              Move Left
            </BaseButton>
          </Show>
          <BaseButton
            variant='text'
            startIcon={edit}
            className='font-semibold w-full py-3 hover:text-primary'
            imgClassName='mr-3'
            onClick={onOpenEditModal}
            onMouseOver={() => setEdit(HoverEditIcon)}
            onMouseOut={() => setEdit(EditIcon)}
          >
            Edit
          </BaseButton>
          <BaseButton
            variant='text'
            startIcon={trash}
            className='font-semibold w-full py-3 hover:text-danger'
            imgClassName='mr-3'
            onClick={onOpenDeleteModal}
            onMouseOver={() => setTrash(HoverTrashIcon)}
            onMouseOut={() => setTrash(TrashIcon)}
          >
            Delete
          </BaseButton>
        </div>
      </div>

      {/* edit modal */}
      <Show when={isShowEditModal}>
        <ModalCreateOrEditItem
          todoId={todoId}
          itemId={itemId}
          isEdit={true}
          name={name}
          progress_percentage={progress_percentage}
          onCloseModal={onCloseEditModal}
          onCloseDropdown={onCloseDropdown}
        />
      </Show>

      {/* delete modal */}
      <Show when={isShowDeleteModal}>
        <ModalDelete
          isLoading={deleteMutation.isLoading}
          onDelete={onDeleteClicked}
          onCloseModal={onCloseDeleteModal}
        />
      </Show>
    </div>
  )
}
