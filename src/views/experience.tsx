'use client'

import { Fragment, useState } from 'react'
import { ArrowUpRightIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { NavigationBar } from '@/components/navigation'
import { MenuToExperiencePipes } from '@/components/pipes'
import { useProgressStore } from '@/state/progress/reducer'

export function ExperienceView() {
  const { unlockedViews } = useProgressStore()
  if (!unlockedViews['experience']) return null

  return (
    <div className="wrapper">
      <MenuToExperiencePipes type="target" />
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

const OPTIONS = [
  { title: 'Derivatives', key: 'derivatives' },
  { title: 'Yield Optimizer', key: 'yield-optimizer' },
  { title: 'E-Commerce', key: 'e-commerce' },
] as const

type Option = (typeof OPTIONS)[number]

function ContentCard() {
  const [selectedOption, setSelectedOption] = useState<Option['key']>(OPTIONS[0].key)

  return (
    <Card variant="paper" className="flex flex-row p-9 gap-8 relative h-[540px] w-full">
      <div className="flex flex-col justify-center gap-6 w-fit h-full">
        {OPTIONS.map((option, index) => (
          <Fragment key={option.key}>
            <OptionRow
              option={option}
              active={selectedOption === option.key}
              toggle={() => setSelectedOption(option.key)}
            />
            {index !== OPTIONS.length - 1 && <div className="border-b border-border w-full" />}
          </Fragment>
        ))}
      </div>
      <div className="relative flex bg-card h-full min-w-0 rounded-sm p-5">
        {selectedOption === 'derivatives' && <Derivatives />}
        {selectedOption === 'yield-optimizer' && <YieldOptimizer />}
        {selectedOption === 'e-commerce' && <ECommerce />}
      </div>
    </Card>
  )
}

function OptionRow({ option, active, toggle }: { option: Option; active: boolean; toggle: () => void }) {
  return (
    <div
      className={cn('flex flex-row items-center gap-6 cursor-default', {
        'opacity-50 cursor-pointer': !active,
      })}
      onClick={toggle}
    >
      <h3 className="text-[40px] font-medium">{option.title}</h3>
      <ArrowUpRightIcon className="opacity-70 ml-auto" size={25} />
    </div>
  )
}

function Derivatives() {
  return (
    <div className="flex flex-col gap-2 h-full w-full overflow-hidden text-wrap flex-wrap">
      <h1 className="text-[40px] font-medium">Derivatives</h1>
      <p className="text-sm text-muted-foreground break-words leading-relaxed">
        Derivatives are financial instruments that derive their value from an underlying asset. They are used to hedge
        against risk or to speculate on the future price of an asset.
      </p>
    </div>
  )
}

function YieldOptimizer() {
  return <div>Yield Optimizer</div>
}

function ECommerce() {
  return <div>ECommerce</div>
}
