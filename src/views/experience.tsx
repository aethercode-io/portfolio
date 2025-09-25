'use client'

import { ArrowUpRightIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { MenuToExperiencePipes } from '@/components/pipes'
import { NavigationBar } from '@/components/navigation'
import { useState } from 'react'

export function ExperienceView() {
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
  { title: 'P2P Derivatives', key: 'p2p-derivatives' },
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
          <>
            <OptionRow
              key={option.key}
              option={option}
              active={selectedOption === option.key}
              toggle={() => setSelectedOption(option.key)}
            />
            {index !== OPTIONS.length - 1 && <div className="border-b border-border w-full" />}
          </>
        ))}
      </div>
      <div className="flex flex-1 bg-white h-full">
        {selectedOption === 'p2p-derivatives' && <P2PDerivatives />}
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

function P2PDerivatives() {
  return <div>P2P Derivatives</div>
}

function YieldOptimizer() {
  return <div>Yield Optimizer</div>
}

function ECommerce() {
  return <div>ECommerce</div>
}
