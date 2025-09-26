'use client'

import { useState } from 'react'
import { LockKeyholeIcon, MapIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { getViewByKey } from '@/lib/views'
import { MiniMap } from '@/components/mini-map'
import { useCameraStore } from '@/state/camera/reducer'
import { useProgressStore } from '@/state/progress/reducer'
import { useResetProgress } from '@/state/progress/hooks'
import { useActiveView, useCameraMovements } from '@/state/camera/hooks'

const landingViewCoords = getViewByKey('landing')
const menuViewCoords = getViewByKey('menu')

export function NavigationBar() {
  const { moveCameraTo } = useCameraMovements()
  const { unlockedViews } = useProgressStore()
  const resetProgress = useResetProgress()
  const [showMiniMap, setShowMiniMap] = useState(false)

  const numberLocked = Object.entries(unlockedViews).filter(([_, unlocked]) => !unlocked).length
  const activeView = useActiveView()
  const activeViewIsNotDefault = activeView.key !== 'landing' && activeView.key !== 'menu'

  return (
    <div className="flex gap-1 z-50">
      <Pill className="[&_button]:cursor-pointer">
        <button onClick={() => moveCameraTo(landingViewCoords)}>~</button>
        <DiagonalLine />
        <button onClick={() => moveCameraTo(menuViewCoords)}>menu</button>
        {activeViewIsNotDefault && (
          <>
            <DiagonalLine />
            {activeView.key}
          </>
        )}
      </Pill>
      <div className="relative" onMouseEnter={() => setShowMiniMap(true)} onMouseLeave={() => setShowMiniMap(false)}>
        <Pill className="cursor-pointer">
          Map <MapIcon size={16} />
        </Pill>
        {showMiniMap && (
          <div className="absolute top-full left-0 mt-2">
            <MiniMap />
          </div>
        )}
        {/* Invisible hover area to bridge the gap between pill and minimap */}
        {showMiniMap && <div className="absolute top-full left-0 w-full h-2" />}
      </div>
      {numberLocked > 0 && (
        <Pill className="px-3 gap-1">
          <LockKeyholeIcon size={16} />
          {numberLocked > 1 && <p className="text-xs align-bottom">+{numberLocked}</p>}
        </Pill>
      )}
      <Pill>
        <button onClick={resetProgress}>Reset</button>
      </Pill>
    </div>
  )
}

function Pill({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <div
      className={cn(
        'flex flex-row items-center w-fit h-9 border bg-card border-border rounded-full px-3 py-1 gap-1 text-sm text-card-muted-foreground',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

function DiagonalLine() {
  return (
    <div className="h-6 w-4 flex items-center justify-center">
      <svg className="w-full h-full">
        <line x1="70%" y1="20%" x2="30%" y2="80%" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  )
}
