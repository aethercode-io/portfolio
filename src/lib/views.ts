import { IVec2 } from '@/lib/vector'

export type ViewKey = 'landing' | 'menu' | 'projects' | 'experience' | 'about'

export interface ViewCoords extends IVec2 {
  key: ViewKey
}

export interface ViewFC extends ViewCoords {
  view: React.ComponentType
}

// prettier-ignore
export const VIEWS_GRID: Array<Array<ViewKey | null>> = [
  [null,      'experience', null    ],
  ['landing', 'menu',       'about' ],
  [null,      'projects',   null    ],
]

export const VIEWS_COORDS = VIEWS_GRID.reduce((acc, row, y) => {
  for (let i = 0; i < row.length; i++) {
    const key = row[i]
    if (key !== null) {
      acc.push({
        x: i,
        y: y,
        key: key,
      })
    }
  }

  return acc
}, [] as Array<ViewCoords>)

export function getViewByCoords(coords: IVec2): ViewCoords | undefined {
  return VIEWS_COORDS.find((view) => view.x === coords.x && view.y === coords.y)
}

export function getViewByKey(key: ViewKey): ViewCoords {
  return VIEWS_COORDS.find((view) => view.key === key)!
}
