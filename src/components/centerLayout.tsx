interface CenterProps {
  children: React.ReactNode
  className?: string
}

export default function CenterLayout({ children, className }: CenterProps) {
  return (
    <div className={`container flex h-screen ${className}`}>
      <div className='m-auto max-sm:w-full w-2/5'>{children}</div>
    </div>
  )
}
