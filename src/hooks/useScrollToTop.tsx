import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

interface UseScrollToTopProps {
  children: JSX.Element
}

function useScrollToTop({ children }: UseScrollToTopProps) {
  const location = useLocation()
  const navType = useNavigationType()

  useEffect(() => {
    if (navType !== 'POP') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return children
}

export default function ScrollToTop({ children }: UseScrollToTopProps) {
  return useScrollToTop({ children })
}
