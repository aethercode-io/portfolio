import Image from 'next/image'

import { CameraGrid } from '@/components/camera-grid'

export default function Home() {
  return (
    <div className="relative h-screen w-screen">
      <CameraGrid />
      <div className="absolute bottom-4 right-4">
        <Image src="aethercode.svg" alt="aethercode" width={56} height={0} priority={false} />
      </div>
    </div>
  )
}
