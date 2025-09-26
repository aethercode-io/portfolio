import { MenuView } from './menu'
import { AboutView } from './about'
import { LandingView } from './landing'
import { ExperienceView } from './experience'
import { PlaygroundView } from './playground'

import { ViewKey } from '@/lib/views'

export const VIEWS_FC: Record<ViewKey, React.ComponentType> = {
  landing: LandingView,
  menu: MenuView,
  experience: ExperienceView,
  playground: PlaygroundView,
  about: AboutView,
} as const
