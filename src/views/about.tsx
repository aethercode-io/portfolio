'use client'

import { Card } from '@/components/ui/card'
import { MenuToAboutPipes } from '@/components/pipes'
import { NavigationBar } from '@/components/navigation'
import { useProgressStore } from '@/state/progress/reducer'

export function AboutView() {
  const { unlockedViews } = useProgressStore()
  if (!unlockedViews['about']) return null

  return (
    <div className="wrapper">
      <MenuToAboutPipes type="target" />
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
    <Card variant="paper" className="flex flex-row p-9 gap-8 relative h-[540px] w-full">
      ABOUT
    </Card>
  )
}
