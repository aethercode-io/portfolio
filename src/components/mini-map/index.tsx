'use client'

import { LockKeyholeIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useProgressStore } from '@/state/progress/reducer'
import { ViewCoords, VIEWS_GRID, getViewByCoords } from '@/lib/views'
import { useCameraMovements, useIsActiveView } from '@/state/camera/hooks'

export function MiniMap() {
  const { unlockedViews } = useProgressStore()
  const numberOfColumns = VIEWS_GRID.reduce((acc, row) => Math.max(acc, row.length), 0)
  const numberOfRows = VIEWS_GRID.length
  const ratioUnlocked = Object.values(unlockedViews).filter(Boolean).length / Object.keys(unlockedViews).length

  return (
    <div className="bg-card border-border border rounded-sm z-50">
      <div
        className="grid p-5 gap-1"
        style={{
          gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
          gridTemplateRows: `repeat(${numberOfRows}, 1fr)`,
        }}
      >
        {Array.from({ length: numberOfColumns * numberOfRows }).map((_, i) => (
          <UnknownCell key={i} x={i % numberOfColumns} y={Math.floor(i / numberOfColumns)} />
        ))}
      </div>
      <p className="absolute top-5 right-5 text-sm text-muted-foreground">{ratioUnlocked * 100}%</p>
    </div>
  )
}

function UnknownCell({ x, y }: { x: number; y: number }) {
  const view = getViewByCoords({ x, y })
  const { unlockedViews } = useProgressStore()
  const unlocked = view && unlockedViews[view.key]

  if (!view) {
    return <div className="w-32 h-16" />
  }

  if (!unlocked) {
    return <LockedCell />
  }

  return <UnlockedCell view={view} />
}

function LockedCell() {
  return (
    <div className="w-32 h-16 bg-card border border-border rounded-xs flex items-center justify-center cursor-not-allowed">
      <LockKeyholeIcon className="w-4 h-4 text-primary-foreground" />
    </div>
  )
}

function UnlockedCell({ view }: { view: ViewCoords }) {
  const isActive = useIsActiveView(view)
  const { moveCameraTo } = useCameraMovements()

  return (
    <button
      className={cn('relative w-32 h-16 border border-border rounded-xs flex items-center justify-center', {
        'cursor-default bg-primary text-primary-foreground': isActive,
        'cursor-pointer bg-white hover:bg-primary/50': !isActive,
      })}
      onClick={() => moveCameraTo({ x: view.x, y: view.y })}
      disabled={isActive}
    >
      {isActive && <div className="absolute top-2 left-2 w-2 h-2 bg-green-500/50 rounded-full" />}
      <p className="text-center ">{view.key}</p>
    </button>
  )
}
