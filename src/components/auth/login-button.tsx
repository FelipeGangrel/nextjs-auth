'use client'

import { useRouter } from 'next/navigation'

import { appRoutes } from '@/lib/routes'

type LoginButtonProps = {
  mode?: 'modal' | 'redirect'
  asChild?: boolean
  children?: React.ReactNode
}

export const LoginButton = ({
  asChild,
  children,
  mode = 'redirect',
}: LoginButtonProps) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(appRoutes.auth.login())
  }

  if (mode === 'modal') {
    return <span>TODO: Implement modal</span>
  }

  return <span onClick={handleClick}>{children}</span>
}
