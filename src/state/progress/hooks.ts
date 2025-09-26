import { useCameraStore } from '../camera/reducer'
import { useProgressStore } from './reducer'

export function useResetProgress() {
  const { setCoordinates } = useCameraStore()
  const { reset } = useProgressStore()

  return () => {
    setCoordinates({ x: 0, y: 1 })
    reset()
  }
}
