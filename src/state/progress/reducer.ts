import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { PageKey } from '@/lib/views'

interface ProgressStore {
  unlockedPages: Record<PageKey, boolean>
  unlockPage: (pageKey: PageKey) => void
  reset: () => void
}

const DEFAULT_UNLOCKED_PAGES: Record<PageKey, boolean> = {
  landing: true,
  menu: true,
  experience: false,
  playground: false,
  about: false,
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      unlockedPages: DEFAULT_UNLOCKED_PAGES,

      unlockPage: (pageKey) => {
        const { unlockedPages } = get()
        if (unlockedPages[pageKey]) return

        set({
          unlockedPages: {
            ...unlockedPages,
            [pageKey]: true,
          },
        })
      },

      reset: () => {
        set({
          unlockedPages: DEFAULT_UNLOCKED_PAGES,
        })
      },
    }),
    {
      name: 'progress',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
