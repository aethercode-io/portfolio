import { create } from 'zustand'
import { PageKey } from '@/lib/views'

interface ProgressStore {
  unlockedPages: Record<PageKey, boolean>
  unlockPage: (pageKey: PageKey) => void
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  unlockedPages: {
    landing: true,
    menu: false,
    experience: false,
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
}))
