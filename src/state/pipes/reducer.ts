import { create } from 'zustand'
import { IVec2 } from '@/lib/vector'

interface PipeSetters {
  setMenuProjectsPipe: (pipe: IVec2 | null) => void
  setMenuExperiencePipe: (pipe: IVec2 | null) => void
  setMenuAboutPipe: (pipe: IVec2 | null) => void
}

interface PipesStore extends PipeSetters {
  windowDimensions: { width: number; height: number }
  setWindowDimensions: (dimensions: { width: number; height: number }) => void

  menuProjectsPipe: IVec2 | null
  menuExperiencePipe: IVec2 | null
  menuAboutPipe: IVec2 | null
}

export const usePipesStore = create<PipesStore>((set, get) => ({
  windowDimensions: { width: 0, height: 0 },
  menuProjectsPipe: null,
  menuExperiencePipe: null,
  menuAboutPipe: null,

  setWindowDimensions: (dimensions) => set({ windowDimensions: dimensions }),
  setMenuProjectsPipe: (pipe) => set({ menuProjectsPipe: pipe }),
  setMenuExperiencePipe: (pipe) => set({ menuExperiencePipe: pipe }),
  setMenuAboutPipe: (pipe) => set({ menuAboutPipe: pipe }),
}))
