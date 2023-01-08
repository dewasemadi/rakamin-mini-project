interface AlertProps {
  message: string
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  className: string
}

const setColor = (variant: string) => {
  switch (variant) {
    case 'primary':
      return 'bg-blue-100 text-blue-700'
    case 'secondary':
      return 'bg-purple-100 text-purple-700 mb-3'
    case 'success':
      return 'bg-green-100 text-green-700 mb-3'
    case 'danger':
      return 'bg-red-100 text-red-700 mb-3'
    case 'warning':
      return 'bg-yellow-100 text-yellow-700 mb-3'
    case 'info':
      return 'bg-indigo-100 text-indigo-700 mb-3'
    case 'light':
      return 'bg-gray-50 text-gray-500 mb-3'
    case 'dark':
      return 'bg-gray-300 text-gray-800 mb-3'
  }
}

export default function Alert({ message, variant = 'primary', className }: AlertProps) {
  const color = setColor(variant)

  return (
    <div className={`rounded-lg py-3 px-4 mb-4 text-base ${color} ${className}`} role='alert'>
      {message}
    </div>
  )
}
