import { Show } from 'components/show'
import { Controller } from 'react-hook-form'

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  placeholder: string
  rows?: number
  className?: string
  errorMessage?: string
  name: string
  control: any
}

function setColor(isError: boolean) {
  switch (isError) {
    case true:
      return 'focus:outline-none focus:border-danger focus:caret-danger'
    case false:
      return 'border-neutral-40 focus:outline-none focus:border-primary focus:caret-primary'
  }
}

export default function TextField(props: TextFieldProps) {
  const { label, placeholder, rows, className, errorMessage, name, control, ...rest } = props
  const color = setColor(!!errorMessage)

  return (
    <div className={className}>
      <label htmlFor='name' className='w-full block text-neutral-90 mb-2'>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            {...rest}
            autoComplete='on'
            placeholder={placeholder}
            className={`w-full py-2 px-4 rounded-lg bg-white border-2 ${color}`}
          />
        )}
      />
      <Show when={!!errorMessage}>
        <p className='text-danger mt-1'>{errorMessage}</p>
      </Show>
    </div>
  )
}
