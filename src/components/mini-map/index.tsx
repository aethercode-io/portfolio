'use client'

import { LockKeyholeIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useCameraMovements } from '@/state/camera/hooks'
import { useProgressStore } from '@/state/progress/reducer'
import { PAGES, getNumberColumns, getNumberRows, Page } from '@/lib/views'
import { useCameraStore } from '@/state/camera/reducer'

export function MiniMap() {
  const { unlockedPages } = useProgressStore()
  const columns = getNumberColumns()
  const rows = getNumberRows()
  const percentage = Object.values(unlockedPages).filter(Boolean).length / Object.keys(unlockedPages).length

  return (
    <div className="bg-card border-border border rounded-sm z-50">
      <div
        className="grid p-5 gap-1"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array.from({ length: columns * rows }).map((_, i) => (
          <UnknownCell key={i} x={i % columns} y={Math.floor(i / columns)} />
        ))}
      </div>
      <p className="absolute top-5 right-5 text-sm text-muted-foreground">{percentage * 100}%</p>
    </div>
  )
}

function UnknownCell({ x, y }: { x: number; y: number }) {
  const page = PAGES.find((page) => page.x === x && page.y === y)
  const { unlockedPages } = useProgressStore()
  const unlocked = page && unlockedPages[page.key]

  if (!page) {
    return <div className="w-32 h-16" />
  }

  if (!unlocked) {
    return <LockedCell />
  }

  return <UnlockedCell page={page} />
}

function LockedCell() {
  return (
    <div className="w-32 h-16 bg-card border border-border rounded-xs flex items-center justify-center cursor-not-allowed">
      <LockKeyholeIcon className="w-4 h-4 text-primary-foreground" />
    </div>
  )
}

function UnlockedCell({ page }: { page: Page }) {
  const { coordinates } = useCameraStore()
  const { moveCameraTo } = useCameraMovements()
  const isActive = coordinates.x === page.x && coordinates.y === page.y

  return (
    <button
      className={cn('relative w-32 h-16 border border-border rounded-xs flex items-center justify-center', {
        'cursor-default bg-primary text-primary-foreground': isActive,
        'cursor-pointer bg-white hover:bg-primary/50': !isActive,
      })}
      onClick={() => moveCameraTo({ x: page.x, y: page.y })}
      disabled={isActive}
    >
      {isActive && <div className="absolute top-2 left-2 w-2 h-2 bg-green-500/50 rounded-full" />}
      <p className="text-center ">{page.key}</p>
    </button>
  )
}
