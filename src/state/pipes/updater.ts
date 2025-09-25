import { useEffect } from 'react'
import { useWindowSize } from 'usehooks-ts'

import { usePipesStore } from './reducer'

export function PipesUpdater() {
  const { width, height } = useWindowSize()
  const { setWindowDimensions } = usePipesStore()

  useEffect(() => {
    setWindowDimensions({ width, height })
  }, [width, height])

  return null
}
