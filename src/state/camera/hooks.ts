import { IVec2 } from '@/lib/types'
import { getPage } from '@/lib/views'
import { useCameraStore } from './reducer'
import { useProgressStore } from '../progress/reducer'

export function useCameraMovements() {
  const { unlockPage } = useProgressStore()
  const { setCoordinates, coordinates } = useCameraStore()

  const setTarget = (target: IVec2) => {
    const page = getPage(target)

    if (page) {
      unlockPage(page.key)
      setCoordinates(target)
    }
  }

  const moveCameraUp = () => {
    setTarget({ x: coordinates.x, y: coordinates.y - 1 })
  }

  const moveCameraDown = () => {
    setTarget({ x: coordinates.x, y: coordinates.y + 1 })
  }

  const moveCameraLeft = () => {
    setTarget({ x: coordinates.x - 1, y: coordinates.y })
  }

  const moveCameraRight = () => {
    setTarget({ x: coordinates.x + 1, y: coordinates.y })
  }

  return {
    moveCameraUp,
    moveCameraDown,
    moveCameraLeft,
    moveCameraRight,
  }
}
