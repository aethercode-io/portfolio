import { IVec2 } from '@/lib/types'
import { getPage } from '@/lib/views'
import { useCameraStore } from './reducer'
import { useProgressStore } from '../progress/reducer'

export function useCameraMovements() {
  const { unlockPage } = useProgressStore()
  const { setCoordinates, coordinates } = useCameraStore()

  const moveCameraTo = (target: IVec2) => {
    const page = getPage(target)

    if (page) {
      unlockPage(page.key)
      setCoordinates(target)
    }
  }

  const moveCameraUp = () => {
    moveCameraTo({ x: coordinates.x, y: coordinates.y - 1 })
  }

  const moveCameraDown = () => {
    moveCameraTo({ x: coordinates.x, y: coordinates.y + 1 })
  }

  const moveCameraLeft = () => {
    moveCameraTo({ x: coordinates.x - 1, y: coordinates.y })
  }

  const moveCameraRight = () => {
    moveCameraTo({ x: coordinates.x + 1, y: coordinates.y })
  }

  return {
    moveCameraTo,
    moveCameraUp,
    moveCameraDown,
    moveCameraLeft,
    moveCameraRight,
  }
}
