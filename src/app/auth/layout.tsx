import { BaseLayoutProps } from '@/types'

export default function AuthLayout({ children }: BaseLayoutProps) {
  return (
    <div className="flex h-full items-center justify-center">{children}</div>
  )
}
