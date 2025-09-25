'use client'

import { Pipes } from './builder'
import { RAINBOW_COLORS } from '@/lib/colors'

const THICKNESS_MAX = 480
const THICKNESS_MIN = 280

export function LandingToMenuPipes({ type }: { type: 'source' | 'target' }) {
  if (type === 'source') {
    return <Source />
  } else {
    return <Target />
  }
}

function Source() {
  return (
    <div
      className="absolute top-1/2 left-0 w-full"
      style={{
        transform: `translateY(-${THICKNESS_MAX / 2}px)`,
      }}
    >
      <Pipes
        thicknessStart={THICKNESS_MAX}
        thicknessEnd={THICKNESS_MIN}
        colors={RAINBOW_COLORS}
        orientation="horizontal"
      />
    </div>
  )
}

function Target() {
  return (
    <div
      className="absolute top-1/2 left-0 w-1/2"
      style={{
        transform: `translateY(-${THICKNESS_MIN / 2}px)`,
      }}
    >
      <Pipes
        thicknessStart={THICKNESS_MIN}
        thicknessEnd={THICKNESS_MIN}
        colors={RAINBOW_COLORS}
        orientation="horizontal"
      />
    </div>
  )
}
