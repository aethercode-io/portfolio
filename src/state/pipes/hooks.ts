import { useEffect, useMemo } from 'react'
import { usePipesStore } from './reducer'
import { useElementObserver } from '@/hooks/useElementObserver'

const PipeSetterKeys = {
  menu_experience: 'setMenuExperiencePipe',
  menu_playground: 'setMenuPlaygroundPipe',
  menu_about: 'setMenuAboutPipe',
} as const

type PipeSetterKey = keyof typeof PipeSetterKeys

export function usePipeRegister(key: PipeSetterKey) {
  const { ref, x, y, width, height } = useElementObserver<HTMLDivElement>()
  const { windowDimensions, [PipeSetterKeys[key]]: setPipe } = usePipesStore()

  const computed = useMemo(() => {
    // We don't know our screen size yet
    if (!windowDimensions.width || !windowDimensions.height) return null

    // We don't known the width of our element yet
    if (!width || !height) return null

    const computedX = windowDimensions.width < x ? Math.abs(windowDimensions.width - x) : x
    const computedY = windowDimensions.height < y ? Math.abs(windowDimensions.height - y) : y

    return {
      x: computedX + width / 2,
      y: computedY + height / 2,
    }
  }, [x, y, width, height, windowDimensions.width, windowDimensions.height])

  useEffect(() => {
    setPipe(computed)
  }, [computed])

  return { ref }
}
