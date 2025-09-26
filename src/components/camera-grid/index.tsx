'use client'

import { cn } from '@/lib/utils'
import { VIEWS_FC } from '@/views'
import { VIEWS_COORDS } from '@/lib/views'
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
        {VIEWS_COORDS.map((coords, i) => {
          const View = VIEWS_FC[coords.key]
          return (
            <div
              key={i}
              className={cn('absolute w-screen h-screen')}
              style={{
                left: `${coords.x * 100}vw`,
                top: `${coords.y * 100}vh`,
              }}
            >
              <View />
            </div>
          )
        })}
      </div>
    </div>
  )
}
