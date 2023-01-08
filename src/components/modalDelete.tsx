import { Show } from './show'
import Spinner from './spinner'
import ModalBase from './modalBase'
import BaseButton from './baseButton'
import CloseIcon from 'assets/close.svg'
import DangerIcon from 'assets/danger.svg'

interface ModalDeleteProps {
  isLoading: boolean
  onCloseModal: () => void
  onDelete: () => void
}

export default function ModalDelete({ isLoading, onCloseModal, onDelete }: ModalDeleteProps) {
  return (
    <ModalBase onCloseModal={onCloseModal}>
      {/*header*/}
      <div className='flex items-center justify-between p-5 rounded-t'>
        <div className='flex gap-2'>
          <img src={DangerIcon} alt='danger' />
          <h3 className='text-lg font-semibold'>Delete Task</h3>
        </div>
        <BaseButton variant='text' startIcon={CloseIcon} className='hover:bg-neutral-30 px-1' onClick={onCloseModal} />
      </div>
      {/*body*/}
      <div className='relative py-1 px-6 flex-auto'>
        <p>Are you sure want to delete this task? your action can't be reverted.</p>
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
          <BaseButton
            type='button'
            className='border-2 border-danger hover:border-danger-dark'
            variant='danger'
            onClick={onDelete}
          >
            Delete
          </BaseButton>
        </Show>
      </div>
    </ModalBase>
  )
}
