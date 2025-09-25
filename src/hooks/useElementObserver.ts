import { RefObject, useRef, useState } from 'react'
import { useIsomorphicLayoutEffect, useResizeObserver } from 'usehooks-ts'

interface ElementObserverResult<T extends HTMLElement> {
  ref: RefObject<T | null>
  x: number
  y: number
  width: number
  height: number
}

export function useElementObserver<T extends HTMLElement>(): ElementObserverResult<T> {
  const ref = useRef<T>(null)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const size = useResizeObserver<T>({ ref: ref as RefObject<T> })

  useIsomorphicLayoutEffect(() => {
    function updatePosition() {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setX(rect.left)
        setY(rect.top)
      }
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [])

  return {
    ref,
    x,
    y,
    width: size.width ?? 0,
    height: size.height ?? 0,
  }
}
