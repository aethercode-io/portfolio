'use client'

import { Pipes } from './builder'
import { COLORS } from '@/lib/colors'

const THICKNESS = 100
const COLOR = COLORS.light_blue

export function MenuToExperiencePipes({ type }: { type: 'source' | 'target' }) {
  if (type === 'source') {
    return <Source />
  } else {
    return <Target />
  }
}

function Source() {
  return (
    <div
      className="absolute left-1/2 bottom-0 h-1/2"
      style={{
        transform: `translateX(-${THICKNESS / 2}px)`,
      }}
    >
      <Pipes thicknessStart={THICKNESS} thicknessEnd={THICKNESS} colors={[COLOR]} orientation="vertical" />
    </div>
  )
}

function Target() {
  return (
    <div
      className="absolute left-1/2 top-0 h-1/2"
      style={{
        transform: `translateX(-${THICKNESS / 2}px)`,
      }}
    >
      <Pipes thicknessStart={THICKNESS} thicknessEnd={THICKNESS} colors={[COLOR]} orientation="vertical" />
    </div>
  )
}
