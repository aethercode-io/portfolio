'use client'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { useCameraMovements } from '@/state/camera/hooks'
import { LandingToMenuPipes, MenuToExperiencePipes } from '@/components/pipes'
import { NavigationBar } from '@/components/navigation'

export function MenuView() {
  return (
    <div className="wrapper">
      <LandingToMenuPipes type="target" />
      <MenuToExperiencePipes type="source" />
      <ContentContainer />
    </div>
  )
}

function ContentContainer() {
  return (
    <div className="relative flex flex-col gap-4 w-8/12">
      <NavigationBar />
      <ContentCard />
    </div>
  )
}

function ContentCard() {
  return (
    <Card className="relative flex p-6 gap-2 h-[540px] w-full">
      <ExperienceOption className="rounded-l-md" />
      <ExperienceOption />
      <ExperienceOption className="rounded-r-md" />
    </Card>
  )
}

function ExperienceOption({ className }: { className?: string }) {
  const { moveCameraDown } = useCameraMovements()
  const handleClick = () => moveCameraDown()

  return (
    <div
      className={cn('relative flex flex-col gap-4 bg-white h-full w-full cursor-pointer', className)}
      onClick={handleClick}
    >
      Experience
    </div>
  )
}
