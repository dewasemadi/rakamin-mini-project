import { Show } from './show'
import Spinner from './spinner'
import { useState } from 'react'
import BaseButton from './baseButton'
import PlusIcon from 'assets/plus.svg'
import ModalAddGroup from './modalAddGroup'
import { useNavigate } from 'react-router-dom'
import { removeTokenFromLocalStorage } from 'utils/tokenManager'

interface HeaderProps {
  onScrollToRight: () => void
}

export default function Header({ onScrollToRight }: HeaderProps) {
  const [isShowModal, setIsShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const onLogoutClicked = () => {
    setIsLoading(true)
    setTimeout(() => {
      removeTokenFromLocalStorage()
      navigate('/v1/login', { replace: true })
    }, 500) // .5 seconds
  }
  const onOpenModal = () => {
    setIsShowModal(true)
  }
  const onCloseModal = () => {
    setIsShowModal(false)
  }

  return (
    <header className='bg-white shadow fixed w-full z-50 top-0 min-h-[68px]'>
      <div className='container flex justify-between py-4 items-end'>
        <div className='flex gap-4 items-center max-sm:justify-between max-sm:flex-col max-sm:gap-0 max-sm:items-start'>
          <h1 className='text-lg font-bold'>Product Roadmap</h1>
          <BaseButton startIcon={PlusIcon} onClick={onOpenModal}>
            Add New Group
          </BaseButton>
        </div>
        <Show when={isLoading}>
          <Spinner />
        </Show>
        <Show when={!isLoading}>
          <BaseButton variant='neutral' onClick={onLogoutClicked}>
            Logout
          </BaseButton>
        </Show>
      </div>

      {/* modal */}
      <Show when={isShowModal}>
        <ModalAddGroup onCloseModal={onCloseModal} onScrollToRight={onScrollToRight} />
      </Show>
    </header>
  )
}
