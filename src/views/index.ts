import { MenuView } from './menu'
import { AboutView } from './about'
import { LandingView } from './landing'
import { ProjectsView } from './projects'
import { ExperienceView } from './experience'

import { ViewKey } from '@/lib/views'

export const VIEWS_FC: Record<ViewKey, React.ComponentType> = {
  landing: LandingView,
  menu: MenuView,
  projects: ProjectsView,
  experience: ExperienceView,
  about: AboutView,
} as const
