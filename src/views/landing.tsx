'use client'

import Image from 'next/image'

import { Card } from '@/components/ui/card'
import { Bubble } from '@/components/bubble'
import { Button } from '@/components/ui/button'
import { LandingToMenuPipes } from '@/components/pipes'
import { useCameraMovements } from '@/state/camera/hooks'
import { StackedLines } from '@/components/stacked-lines'

export function LandingView() {
  return (
    <div className="wrapper">
      <BackgroundBubble />
      <LandingToMenuPipes type="source" />
      <ContentCard />
    </div>
  )
}

function BackgroundBubble() {
  return (
    <div className="absolute right-0 translate-x-1/4 translate-y-1/12">
      <Bubble />
    </div>
  )
}

function ContentCard() {
  return (
    <Card className="relative flex flex-col px-14 py-10 justify-between h-[540px] w-11/12 lg:w-8/12 overflow-hidden">
      <UpperSection />
      <LowerSection />
      <StackedLines position="top-right" />
      <StackedLines position="bottom-left" />
    </Card>
  )
}

function UpperSection() {
  return (
    <div className="flex flex-row justify-between w-full">
      <div className="flex flex-col justify-between gap-6 flex-1 min-w-0">
        <p className="text-2xl text-card-muted-foreground whitespace-pre-line">
          Hi there! I&apos;m Timo, a <span className="font-bold">senior</span> freelance software engineer. <br />I love
          building digital products and systems. I also:
        </p>
        <h1 className="text-8xl text-card-foreground mb-auto">
          love a <br /> <span className="font-bold">challenge</span>
        </h1>
      </div>
      <div className="relative flex items-center justify-center w-48 h-48 rounded-full overflow-hidden flex-shrink-0">
        {/* <Image src="/timo.jpg" alt="timo" fill className="object-cover" priority={false} /> */}
        <div className="w-full h-full bg-card-muted-foreground" />
      </div>
    </div>
  )
}

function LowerSection() {
  const { moveCameraRight } = useCameraMovements()
  const handleClick = () => moveCameraRight()

  return (
    <div className="flex flex-row justify-between items-center w-full mt-auto">
      <p className="text-base text-card-muted-foreground">Click on START to find out more about me.</p>
      <Button variant="default" onClick={handleClick} className="px-10">
        Start
      </Button>
    </div>
  )
}
