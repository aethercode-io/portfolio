import { cn } from '@/lib/utils'
import { IVec2 } from '@/lib/types'

const STROKE_COLOR = '#180800'
const STROKE_WIDTH = 1
const STROKE_OPACITY = 1

interface PipesProps {
  thicknessStart: number
  thicknessEnd: number
  orientation: 'vertical' | 'horizontal'
  colors: string[]
  className?: string
}

export function Pipes({ thicknessStart, thicknessEnd, colors, orientation, className }: PipesProps) {
  const totalThickness = Math.max(thicknessStart, thicknessEnd)
  const shapes = computeShapes(thicknessStart, thicknessEnd, colors, orientation)
  const lastShape = shapes[shapes.length - 1]

  if (!shapes.length) {
    return null
  }

  return (
    <svg
      width={orientation === 'horizontal' ? '100%' : totalThickness}
      height={orientation === 'horizontal' ? totalThickness : '100%'}
      viewBox={orientation === 'horizontal' ? `0 0 100 ${totalThickness}` : `0 0 ${totalThickness} 100`}
      preserveAspectRatio="none"
      className={cn('overflow-visible', className)}
    >
      {shapes.map((shape, index) => (
        <g key={index}>
          {/* Border between items */}
          {orientation === 'horizontal' ? (
            <line
              x1="0"
              y1={shape.points.TL.y}
              x2="100"
              y2={shape.points.TR.y}
              stroke={STROKE_COLOR}
              strokeWidth={STROKE_WIDTH}
              strokeOpacity={STROKE_OPACITY}
            />
          ) : (
            <line
              x1={shape.points.TL.x}
              y1="0"
              x2={shape.points.BL.x}
              y2="100"
              stroke={STROKE_COLOR}
              strokeWidth={STROKE_WIDTH}
              strokeOpacity={STROKE_OPACITY}
            />
          )}

          {/* Pipe */}
          <polygon
            points={pointsToString([shape.points.TL, shape.points.TR, shape.points.BR, shape.points.BL])}
            fill={shape.color}
            style={{
              filter: 'drop-shadow(0 4px 20px rgba(255, 255, 255, 0.1))',
            }}
          />
        </g>
      ))}

      {/* Final border */}
      {orientation === 'horizontal' ? (
        <line
          x1="0"
          y1={lastShape.points.BL.y}
          x2="100"
          y2={lastShape.points.BR.y}
          stroke={STROKE_COLOR}
          strokeWidth={STROKE_WIDTH / 2}
          strokeOpacity={STROKE_OPACITY}
        />
      ) : (
        <line
          x1={lastShape.points.TR.x}
          y1="0"
          x2={lastShape.points.BR.x}
          y2="100"
          stroke={STROKE_COLOR}
          strokeWidth={STROKE_WIDTH / 2}
          strokeOpacity={STROKE_OPACITY}
        />
      )}
    </svg>
  )
}

interface IShape {
  points: { TL: IVec2; TR: IVec2; BL: IVec2; BR: IVec2 }
  color: string
}

function computeShapes(
  thicknessStart: number,
  thicknessEnd: number,
  colors: string[],
  orientation: 'horizontal' | 'vertical'
): Array<IShape> {
  const deltaThickness = Math.abs(thicknessStart - thicknessEnd)
  const offsetStart = thicknessStart > thicknessEnd ? 0 : deltaThickness / 2
  const offsetEnd = thicknessStart > thicknessEnd ? deltaThickness / 2 : 0

  const deltaStart = thicknessStart / colors.length
  const deltaEnd = thicknessEnd / colors.length

  if (deltaThickness % 2 !== 0) {
    throw new Error('Delta thickness must be an even number.')
  }
  if (!Number.isInteger(deltaStart)) {
    throw new Error(`ThicknessStart (${thicknessStart}) must be divisible by number of colors (${colors.length}).`)
  }
  if (!Number.isInteger(deltaEnd)) {
    throw new Error(`ThicknessEnd (${thicknessEnd}) must be divisible by number of colors (${colors.length}).`)
  }

  return Array.from({ length: colors.length }, (_, index) => {
    if (orientation === 'horizontal') {
      const TL = { x: 0, y: offsetStart + deltaStart * index }
      const TR = { x: 100, y: offsetEnd + deltaEnd * index }
      const BL = { x: TL.x, y: TL.y + deltaStart }
      const BR = { x: TR.x, y: TR.y + deltaEnd }
      return { points: { TL, TR, BL, BR }, color: colors[index] }
    } else {
      const TL = { x: offsetStart + deltaStart * index, y: 0 }
      const TR = { x: TL.x + deltaStart, y: 0 }
      const BL = { x: offsetEnd + deltaEnd * index, y: 100 }
      const BR = { x: BL.x + deltaEnd, y: 100 }
      return { points: { TL, TR, BL, BR }, color: colors[index] }
    }
  })
}

function pointsToString(points: IVec2[]) {
  return points.map((point) => `${point.x},${point.y}`).join(' ')
}
