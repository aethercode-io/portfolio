'use client'

import { Pipes } from './builder'
import { COLORS } from '@/lib/colors'
import { usePipesStore } from '@/state/pipes/reducer'

const THICKNESS = 120
const colors = [COLORS.sand_yellow]

export function MenuToProjectsPipes({ type }: { type: 'source' | 'target' }) {
  if (type === 'source') {
    return <Source />
  } else {
    return <Target />
  }
}

function Source() {
  const { menuProjectsPipe } = usePipesStore()
  if (!menuProjectsPipe) return null

  return (
    <div
      className="absolute bottom-0 h-1/2 z-10"
      style={{
        transform: `translateX(-${THICKNESS / 2}px)`,
        left: `${menuProjectsPipe.x}px`,
      }}
    >
      <Pipes thicknessStart={THICKNESS} thicknessEnd={THICKNESS} colors={colors} orientation="vertical" />
    </div>
  )
}

function Target() {
  const { menuProjectsPipe } = usePipesStore()
  if (!menuProjectsPipe) return null

  return (
    <div
      className="absolute top-0 h-1/2"
      style={{
        transform: `translateX(-${THICKNESS / 2}px)`,
        left: `${menuProjectsPipe.x}px`,
      }}
    >
      <Pipes thicknessStart={THICKNESS} thicknessEnd={THICKNESS} colors={colors} orientation="vertical" />
    </div>
  )
}
