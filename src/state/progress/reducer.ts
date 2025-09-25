import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { PageKey } from '@/lib/views'

interface ProgressStore {
  unlockedPages: Record<PageKey, boolean>
  unlockPage: (pageKey: PageKey) => void
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      unlockedPages: {
        landing: true,
        menu: false,
        experience: false,
        playground: false,
        about: false,
      },

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
    }),
    {
      name: 'progress',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
