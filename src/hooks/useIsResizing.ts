import { useEffect, useState } from 'react'

export function useIsResizing(delay = 200) {
  const [resizing, setResizing] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    function handleResize() {
      setResizing(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => setResizing(false), delay)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [delay])

  return resizing
}
