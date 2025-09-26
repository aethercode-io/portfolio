import { create } from 'zustand'
import { IVec2 } from '@/lib/vector'

interface PipeSetters {
  setMenuExperiencePipe: (pipe: IVec2 | null) => void
  setMenuPlaygroundPipe: (pipe: IVec2 | null) => void
  setMenuAboutPipe: (pipe: IVec2 | null) => void
}

interface PipesStore extends PipeSetters {
  windowDimensions: { width: number; height: number }
  setWindowDimensions: (dimensions: { width: number; height: number }) => void

  menuExperiencePipe: IVec2 | null
  menuPlaygroundPipe: IVec2 | null
  menuAboutPipe: IVec2 | null
}

export const usePipesStore = create<PipesStore>((set, get) => ({
  windowDimensions: { width: 0, height: 0 },
  menuExperiencePipe: null,
  menuPlaygroundPipe: null,
  menuAboutPipe: null,

  setWindowDimensions: (dimensions) => set({ windowDimensions: dimensions }),
  setMenuExperiencePipe: (pipe) => set({ menuExperiencePipe: pipe }),
  setMenuPlaygroundPipe: (pipe) => set({ menuPlaygroundPipe: pipe }),
  setMenuAboutPipe: (pipe) => set({ menuAboutPipe: pipe }),
}))
