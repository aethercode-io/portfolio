import Image from 'next/image'

import { CameraGrid } from '@/components/camera-grid'
import { Updaters } from '@/state/updaters'

export default function Home() {
  return (
    <div className="relative h-screen w-screen">
      <CameraGrid />
      <div className="absolute bottom-4 right-4">
        <Image src="aethercode.svg" alt="aethercode" width={56} height={0} priority={false} />
      </div>
      <Updaters />
    </div>
  )
}
