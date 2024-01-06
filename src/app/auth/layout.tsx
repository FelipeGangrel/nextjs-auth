import { BaseLayoutProps } from '@/types'

export default function AuthLayout({ children }: BaseLayoutProps) {
  return (
    <div className="default-gradient flex h-full items-center justify-center">
      {children}
    </div>
  )
}
