import { cn } from '@/lib/utils'

export function OnlineBubble({ className }: { className?: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 100 100" className={cn('', className)}>
      <circle cx="50" cy="50" r="50" fill="#00ff00" fillOpacity={0.5} />
    </svg>
  )
}
