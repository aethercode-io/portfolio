'use client'

import { cn } from '@/lib/utils'
import { PAGES } from '@/lib/views'
import { useIsResizing } from '@/hooks/useIsResizing'
import { useCameraStore } from '@/state/camera/reducer'

export function CameraGrid() {
  const { coordinates } = useCameraStore()
  const resizing = useIsResizing()

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div
        className={cn('absolute', {
          'transition-transform duration-1000 ease-in-out': !resizing,
        })}
        style={{
          transform: `translate(${-coordinates.x * 100}dvw, ${-coordinates.y * 100}dvh)`,
        }}
      >
        {PAGES.map((page, i) => (
          <div
            key={i}
            className={cn('absolute w-screen h-screen', {
              // hidden: Math.abs(coordinates.x - page.x) > 1 || Math.abs(coordinates.y - page.y) > 1,
            })}
            style={{
              left: `${page.x * 100}vw`,
              top: `${page.y * 100}vh`,
            }}
          >
            <page.view />
          </div>
        ))}
      </div>
    </div>
  )
}
