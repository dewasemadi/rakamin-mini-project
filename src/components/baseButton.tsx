import { Show } from 'components/show'

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element | string
  iconWidth?: number
  className?: string
  imgClassName?: string
  startIcon?: string
  variant?: 'primary' | 'neutral' | 'danger' | 'text'
}

function setVariant(variant: string) {
  switch (variant) {
    case 'primary':
      return 'bg-primary shadow-sm text-white hover:bg-primary-border hover:bg-primary-dark'
    case 'neutral':
      return 'bg-white border-2 border-primary border-neutral-40 shadow-sm text-neutral-100 hover:bg-neutral-30'
    case 'danger':
      return 'bg-danger shadow-sm text-white hover:bg-danger-dark'
    case 'text':
      return 'text-neutral-100'
  }
}

export default function BaseButton(props: BaseButtonProps) {
  const { children, className, imgClassName, startIcon, variant = 'primary', iconWidth, ...rest } = props
  const variantClass = setVariant(variant)

  return (
    <button {...rest} className={`h-fit py-1 px-4 text-center rounded-lg font-bold ${variantClass} ${className}`}>
      <div className={startIcon ? 'flex items-center gap-2' : ''}>
        <Show when={!!startIcon}>
          <img src={startIcon} alt='icon' className={`inline-block ${imgClassName}`} width={iconWidth} />
        </Show>
        {children}
      </div>
    </button>
  )
}
