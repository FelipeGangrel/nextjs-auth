import { BaseLayoutProps } from '@/types'

export default function ProtectedLayout({ children }: BaseLayoutProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-10">
      {children}
    </div>
  )
}
