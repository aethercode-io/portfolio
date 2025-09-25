import { IVec2 } from '@/lib/types'

import { MenuView } from '../views/menu'
import { LandingView } from '../views/landing'
import { ExperienceView } from '../views/experience'

export const PAGES = [
  { x: 0, y: 0, view: LandingView, key: 'landing' },
  { x: 1, y: 0, view: MenuView, key: 'menu' },
  { x: 1, y: 1, view: ExperienceView, key: 'experience' },
] as const

export type Page = (typeof PAGES)[number]

export type PageKey = Page['key']

export function getPage(target: IVec2): Page | undefined {
  return PAGES.find((page) => page.x === target.x && page.y === target.y)
}
