import { IVec2 } from '@/lib/types'

import { MenuView } from '@/views/menu'
import { AboutView } from '@/views/about'
import { LandingView } from '@/views/landing'
import { ExperienceView } from '@/views/experience'
import { PlaygroundView } from '@/views/playground'

export type PageKey = 'landing' | 'menu' | 'experience' | 'playground' | 'about'
type PartialPage = { view: React.ComponentType; key: PageKey }
export type Page = { x: number; y: number; view: React.ComponentType; key: PageKey }

const landing: PartialPage = { view: LandingView, key: 'landing' }
const menu: PartialPage = { view: MenuView, key: 'menu' }
const experience: PartialPage = { view: ExperienceView, key: 'experience' }
const playground: PartialPage = { view: PlaygroundView, key: 'playground' }
const about: PartialPage = { view: AboutView, key: 'about' }

// prettier-ignore
export const PAGES_GRID = [
  [null,    playground, null  ],
  [landing, menu,       about ],
  [null,    experience, null  ],
]

export const PAGES: Page[] = PAGES_GRID.reduce((acc: Page[], row, y) => {
  for (let i = 0; i < row.length; i++) {
    const column = row[i]
    if (column !== null) {
      acc.push({
        x: i,
        y: y,
        view: column.view,
        key: column.key,
      } as Page)
    }
  }

  return acc
}, [] as Page[])

export function getPage(target: IVec2): Page | undefined {
  return PAGES.find((page) => page.x === target.x && page.y === target.y)
}

export function getNumberColumns(): number {
  return PAGES_GRID.reduce((acc, row) => Math.max(acc, row.length), 0)
}

export function getNumberRows(): number {
  return PAGES_GRID.length
}
