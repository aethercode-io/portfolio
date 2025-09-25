import { LockKeyholeIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { PAGES, Page } from '@/lib/views'
import { useCameraStore } from '@/state/camera/reducer'
import { useProgressStore } from '@/state/progress/reducer'

export function NavigationBar() {
  return (
    <div className="flex gap-2">
      {PAGES.map((page, i) => (
        <OptionButton key={i} page={page} />
      ))}
    </div>
  )
}

function OptionButton({ page }: { page: Page }) {
  const { coordinates, setCoordinates } = useCameraStore()
  const { unlockedPages } = useProgressStore()
  const isActive = coordinates.x === page.x && coordinates.y === page.y

  return (
    <button
      className={cn('px-4 py-1 bg-card border-l border-border cursor-pointer text-card-foreground', {
        'opacity-50 cursor-not-allowed': !unlockedPages[page.key],
        'bg-primary text-primary-foreground pointer-events-none': isActive,
      })}
      disabled={!unlockedPages[page.key]}
      onClick={() => setCoordinates(page)}
    >
      {unlockedPages[page.key] ? page.key : <LockKeyholeIcon className="w-4 h-4" />}
    </button>
  )
}
