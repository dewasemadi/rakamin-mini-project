import Joi from 'joi'
import {useState} from 'react'
import BaseButton from 'components/baseButton'
import TextField from 'components/textField'
import {joiResolver} from '@hookform/resolvers/joi'
import {useForm} from 'react-hook-form'
import {Link, useNavigate} from 'react-router-dom'
import {register, TRegister} from 'services/authService'
import {useMutation} from 'react-query'
import {Show} from 'components/show'
import Spinner from 'components/spinner'
import CenterLayout from 'components/centerLayout'
import Alert from 'components/alert'

const defaultValues = {
  email: '',
  name: '',
  password: '',
  password_confirmation: '',
}

const registerSchema = Joi.object({
  email: Joi.string().email({tlds: {allow: false}}).required(),
  name: Joi.string().required(),
  password: Joi.string().min(6).required().label('Password'),
  password_confirmation: Joi.string()
    .min(6)
    .required()
    .valid(Joi.ref('password'))
    .label('Password Confirmation')
    .messages({
      'any.only': '{{#label}} does not match',
    }),
})

export default function Register() {
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const {mutate, reset, isError, isLoading} = useMutation(register, {
    onSuccess: () => {
      reset()
      navigate('/v1/login', {replace: true})
    },
    onError: (error: any) => {
      setErrorMessage(error?.message)
    },
  })
  const {control, handleSubmit, formState: {errors},} = useForm({
    defaultValues: defaultValues,
    resolver: joiResolver(registerSchema),
  })
  const onSubmit = (data: TRegister) => mutate(data)

  return (
    <CenterLayout>
      <h1 className='text-2xl font-bold text-neutral-100'>Register</h1>
      <p className='text-neutral-90 mb-8'>Please create your account to continue</p>

      <Show when={isError}>
        <Alert message={errorMessage} variant='danger' className='mb-4 -mt-4'/>
      </Show>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name='name'
          control={control}
          label='Name'
          type='text'
          placeholder='name'
          errorMessage={errors.name?.message}
        />

        <TextField
          name='email'
          control={control}
          label='Email'
          type='email'
          placeholder='email'
          className='mt-4'
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

        <TextField
          name='password_confirmation'
          control={control}
          label='Password Confirmation'
          type='password'
          placeholder='password confirmation'
          className='mt-4'
          errorMessage={errors.password_confirmation?.message}
        />

        <Show when={isLoading}>
          <Spinner className='mt-8'/>
        </Show>
        <Show when={!isLoading}>
          <BaseButton type='submit' variant='primary' className='w-full mt-8'>
            Register
          </BaseButton>
        </Show>
      </form>

      <div className='flex justify-center gap-2 mt-4'>
        <p className='text-neutral-90'>Already have an account?</p>
        <Link to='/v1/login' className='text-primary font-semibold'>
          Login
        </Link>
      </div>
    </CenterLayout>
  )
}
