import { IVec2 } from '@/lib/types'

import { MenuView } from '@/views/menu'
import { AboutView } from '@/views/about'
import { LandingView } from '@/views/landing'
import { ExperienceView } from '@/views/experience'
import { PlaygroundView } from '@/views/playground'

export const PAGES = [
  { x: 0, y: 0, view: LandingView, key: 'landing' },
  { x: 1, y: 0, view: MenuView, key: 'menu' },
  { x: 1, y: 1, view: ExperienceView, key: 'experience' },
  { x: 1, y: -1, view: PlaygroundView, key: 'playground' },
  { x: 2, y: 0, view: AboutView, key: 'about' },
] as const

export type Page = (typeof PAGES)[number]

export type PageKey = Page['key']

export function getPage(target: IVec2): Page | undefined {
  return PAGES.find((page) => page.x === target.x && page.y === target.y)
}
