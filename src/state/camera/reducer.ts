import { create } from 'zustand'
import { IVec2 } from '@/lib/types'

interface CameraStore {
  coordinates: IVec2
  setCoordinates: (coordinates: IVec2) => void
}

export const useCameraStore = create<CameraStore>((set, get) => ({
  coordinates: { x: 0, y: 0 },
  setCoordinates: (coordinates) => set({ coordinates }),
}))
