import { cn } from '@/lib/utils'

interface StackedLinesProps {
  position: 'bottom-left' | 'top-right'
}

export function StackedLines({ position }: StackedLinesProps) {
  return (
    <svg
      className={cn('absolute w-full h-16 opacity-5 pointer-events-none', {
        'bottom-0 left-0': position === 'bottom-left',
        'top-0 right-0 scale-[-1]': position === 'top-right',
      })}
      viewBox="0 0 100 64"
      preserveAspectRatio="none"
    >
      <g>
        <line x1="0" y1="0" x2="16.67" y2="0" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="20" x2="25" y2="20" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="30" x2="50" y2="30" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="40" x2="66.67" y2="40" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="1" />
      </g>
    </svg>
  )
}
