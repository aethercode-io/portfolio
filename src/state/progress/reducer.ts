import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { ViewKey } from '@/lib/views'

interface ProgressStore {
  unlockedViews: Record<ViewKey, boolean>
  unlockView: (viewKey: ViewKey) => void
  reset: () => void
}

const DEFAULT_UNLOCKED_VIEWS: Record<ViewKey, boolean> = {
  landing: true,
  menu: true,
  projects: false,
  experience: false,
  about: false,
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      unlockedViews: DEFAULT_UNLOCKED_VIEWS,

      unlockView: (viewKey) => {
        const { unlockedViews } = get()
        if (unlockedViews[viewKey]) return

        set({
          unlockedViews: {
            ...unlockedViews,
            [viewKey]: true,
          },
        })
      },

      reset: () => {
        set({
          unlockedViews: DEFAULT_UNLOCKED_VIEWS,
        })
      },
    }),
    {
      name: 'progress',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
