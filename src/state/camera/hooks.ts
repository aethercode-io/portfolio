import { IVec2 } from '@/lib/vector'
import { useCameraStore } from './reducer'
import { getViewByCoords, ViewCoords } from '@/lib/views'
import { useProgressStore } from '@/state/progress/reducer'

export function useIsActiveView(coords: IVec2) {
  const { coordinates } = useCameraStore()
  return coordinates.x === coords.x && coordinates.y === coords.y
}

export function useActiveView(): ViewCoords {
  const { coordinates } = useCameraStore()
  return getViewByCoords({ x: coordinates.x, y: coordinates.y })!
}

export function useCameraMovements() {
  const { unlockView } = useProgressStore()
  const { setCoordinates, coordinates } = useCameraStore()

  const moveCameraTo = (target: IVec2) => {
    const view = getViewByCoords(target)

    if (view) {
      unlockView(view.key)
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
