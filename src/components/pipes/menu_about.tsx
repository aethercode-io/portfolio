'use client'

import { Pipes } from './builder'
import { COLORS } from '@/lib/colors'
import { usePipesStore } from '@/state/pipes/reducer'
import { useProgressStore } from '@/state/progress/reducer'

const THICKNESS = 120
const colors = [COLORS.navy_blue]

export function MenuToAboutPipes({ type }: { type: 'source' | 'target' }) {
  if (type === 'source') {
    return <Source />
  } else {
    return <Target />
  }
}

function Source() {
  const { unlockedPages } = useProgressStore()
  const { windowDimensions, menuAboutPipe } = usePipesStore()

  if (!menuAboutPipe || !unlockedPages['about']) return null

  const width = Math.abs(windowDimensions.width - menuAboutPipe.x)

  return (
    <div
      className="absolute top-1/2 right-0 z-10"
      style={{
        transform: `translateY(-${THICKNESS / 2}px)`,
        width: `${width}px`,
      }}
    >
      <Pipes thicknessStart={THICKNESS} thicknessEnd={THICKNESS} colors={colors} orientation="horizontal" />
    </div>
  )
}

function Target() {
  const { menuAboutPipe } = usePipesStore()
  const { unlockedPages } = useProgressStore()

  if (!menuAboutPipe || !unlockedPages['about']) return null

  return (
    <div
      className="absolute top-1/2 left-0 w-1/2"
      style={{
        transform: `translateY(-${THICKNESS / 2}px)`,
      }}
    >
      <Pipes thicknessStart={THICKNESS} thicknessEnd={THICKNESS} colors={colors} orientation="horizontal" />
    </div>
  )
}
