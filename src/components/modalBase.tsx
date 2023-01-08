import OutsideWrapper from 'hooks/useOutsideWrapper'

interface ModalBaseProps {
  children: React.ReactNode
  onCloseModal: () => void
}

export default function ModalBase({ children, onCloseModal }: ModalBaseProps) {
  return (
    <OutsideWrapper callback={onCloseModal}>
      <div>
        <div
          className='z-[100] container justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none'
          onClick={onCloseModal}
        >
          <div className='relative w-full max-w-[420px]' onClick={(e) => e.stopPropagation()}>
            {/*content*/}
            <div className='w-full border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none'>
              {children}
            </div>
          </div>
        </div>
        {/* background with shadow */}
        <div className='opacity-25 fixed inset-0 bg-black z-[50]' />
      </div>
    </OutsideWrapper>
  )
}
