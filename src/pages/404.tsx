import BaseButton from 'components/baseButton'
import CenterLayout from 'components/centerLayout'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <CenterLayout>
      <h1 className='font-bold text-2xl text-center'>Ups... page not found</h1>
      <p className='text-center mb-5'>Please visit another page</p>
      <BaseButton variant='neutral' className='text-md font-medium mx-auto block' onClick={() => navigate('/v1/todo')}>
        Back to home
      </BaseButton>
    </CenterLayout>
  )
}
