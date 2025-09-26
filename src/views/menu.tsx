'use client'

import Image from 'next/image'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { usePipeRegister } from '@/state/pipes/hooks'
import { NavigationBar } from '@/components/navigation'
import { useCameraMovements } from '@/state/camera/hooks'
import { LandingToMenuPipes, MenuToAboutPipes, MenuToExperiencePipes, MenuToPlaygroundPipes } from '@/components/pipes'

export function MenuView() {
  return (
    <div className="wrapper">
      <LandingToMenuPipes type="target" />
      <MenuToExperiencePipes type="source" />
      <MenuToPlaygroundPipes type="source" />
      <MenuToAboutPipes type="source" />

      <div className="relative flex flex-col gap-4 w-8/12">
        <NavigationBar />
        <ContentFrame />
      </div>
    </div>
  )
}

function ContentFrame() {
  return (
    <Card className="relative flex p-6 gap-2 h-[540px] z-20 w-full">
      <ExperienceOption className="rounded-l-md" />
      <PlaygroundOption />
      <AboutOption className="rounded-r-md" />
    </Card>
  )
}

const BASE_OPTION_CLASS =
  'relative flex flex-col items-center justify-center h-full w-full cursor-pointer z-20 group overflow-hidden hover:scale-[1.02] transition-all duration-300'

function ExperienceOption({ className }: { className?: string }) {
  const { ref } = usePipeRegister('menu_experience')
  const { moveCameraDown } = useCameraMovements()

  return (
    <div ref={ref} className={cn(BASE_OPTION_CLASS, 'bg-[#F7E5A5]', className)} onClick={moveCameraDown}>
      <p className="text-[#2F4858] text-4xl group-hover:text-[40px] transition-all duration-300">Experience</p>
      <div className={cn('absolute inset-0 border-2 border-black mix-blend-overlay pointer-events-none', className)} />
      <div className="absolute -bottom-2 -right-6 w-full h-4/5">
        <Image src="experience-bg.svg" alt="experience-bg" fill />
      </div>
    </div>
  )
}

function PlaygroundOption({ className }: { className?: string }) {
  const { ref } = usePipeRegister('menu_playground')
  const { moveCameraUp } = useCameraMovements()

  return (
    <div ref={ref} className={cn(BASE_OPTION_CLASS, 'bg-[#BFC87D]', className)} onClick={moveCameraUp}>
      <p className="text-black mix-blend-overlay text-4xl group-hover:text-[40px] transition-all duration-300">
        Playground
      </p>
      <div className="absolute inset-0 border-2 border-black mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full">
        <Image src="playground-bg.svg" alt="playground-bg" fill />
      </div>
    </div>
  )
}

function AboutOption({ className }: { className?: string }) {
  const { ref } = usePipeRegister('menu_about')
  const { moveCameraRight } = useCameraMovements()

  return (
    <div ref={ref} className={cn(BASE_OPTION_CLASS, 'bg-[#2F4858]', className)} onClick={moveCameraRight}>
      <p className="text-white mix-blend-overlay text-4xl group-hover:text-[40px] transition-all duration-300">About</p>
      <div className={cn('absolute inset-0 border-2 border-black mix-blend-overlay pointer-events-none', className)} />
      <div className="absolute -top-1/5 left-1/6 w-full h-full">
        <Image src="about-bg.svg" alt="about-bg" fill />
      </div>
    </div>
  )
}
