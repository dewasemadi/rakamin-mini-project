import Joi from 'joi'
import {useState} from 'react'
import BaseButton from 'components/baseButton'
import TextField from 'components/textField'
import {joiResolver} from '@hookform/resolvers/joi'
import {useForm} from 'react-hook-form'
import {Link, useNavigate} from 'react-router-dom'
import {login, TLogin} from 'services/authService'
import {useMutation} from 'react-query'
import {setTokenInLocalStorage} from 'utils/tokenManager'
import {Show} from 'components/show'
import Spinner from 'components/spinner'
import CenterLayout from 'components/centerLayout'
import Alert from 'components/alert'

const defaultValues = {
  email: '',
  password: '',
}

const loginSchema = Joi.object({
  email: Joi.string().email({tlds: {allow: false}}).required(),
  password: Joi.string().min(6).required(),
})

export default function Login() {
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const {mutate, reset, isError, isLoading} = useMutation(login, {
    onSuccess: (data) => {
      const token = data?.auth_token
      if (token) {
        setTokenInLocalStorage(token)
        reset()
        navigate('/v1/todo', {replace: true})
      }
    },
    onError: (error: any) => {
      setErrorMessage(error?.message)
    },
  })
  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: defaultValues,
    resolver: joiResolver(loginSchema),
  })
  const onSubmit = (data: TLogin) => mutate(data)

  return (
    <CenterLayout>
      <h1 className='text-2xl font-bold text-neutral-100'>Login</h1>
      <p className='text-neutral-90 mb-8'>Welcome back, please login to your account</p>

      <Show when={isError}>
        <Alert message={errorMessage} variant='danger' className='mb-4 -mt-4'/>
      </Show>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name='email'
          control={control}
          label='Email'
          type='email'
          placeholder='email'
          errorMessage={errors.email?.message}
        />

        <TextField
          name='password'
          control={control}
          label='Password'
          type='password'
          placeholder='password'
          className='mt-4'
          errorMessage={errors.password?.message}
        />

        <Show when={isLoading}>
          <Spinner className='mt-8'/>
        </Show>
        <Show when={!isLoading}>
          <BaseButton type='submit' variant='primary' className='w-full mt-8'>
            Login
          </BaseButton>
        </Show>
      </form>

      <div className='flex justify-center gap-2 mt-4'>
        <p className='text-neutral-90'>Don't have an account yet?</p>
        <Link to='/v1/register' className='text-primary font-semibold'>
          Register
        </Link>
      </div>
    </CenterLayout>
  )
}
