'use client'

import { Card } from '@/components/ui/card'
import { NavigationBar } from '@/components/navigation'
import { MenuToPlaygroundPipes } from '@/components/pipes'
import { useProgressStore } from '@/state/progress/reducer'

export function PlaygroundView() {
  const { unlockedPages } = useProgressStore()
  if (!unlockedPages['playground']) return null

  return (
    <div className="wrapper">
      <MenuToPlaygroundPipes type="target" />
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
      PLAYGROUND
    </Card>
  )
}
