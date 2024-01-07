import { BaseLayoutProps } from '@/types'

import { Navbar } from './_components/navbar'

export default function ProtectedLayout({ children }: BaseLayoutProps) {
  return (
    <div className="container flex h-full w-full max-w-[600px] flex-col items-center justify-center gap-y-10">
      <Navbar />
      {children}
    </div>
  )
}
