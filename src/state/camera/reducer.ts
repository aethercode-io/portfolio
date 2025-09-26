import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { IVec2 } from '@/lib/types'

interface CameraStore {
  coordinates: IVec2
  setCoordinates: (coordinates: IVec2) => void
}

export const useCameraStore = create<CameraStore>()(
  persist(
    (set, get) => ({
      coordinates: { x: 0, y: 1 },
      setCoordinates: (coordinates) => set({ coordinates }),
    }),
    {
      name: 'camera',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
