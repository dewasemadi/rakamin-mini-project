import { useMediaQuery } from 'react-responsive'

export const useResponsive = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' })
  const isTablet = useMediaQuery({ query: '(min-width: 640px) and (max-width: 768px)' })
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' })

  return { isMobile, isTablet, isDesktop }
}
