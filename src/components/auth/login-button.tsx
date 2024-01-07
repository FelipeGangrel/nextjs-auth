'use client'

import { useRouter } from 'next/navigation'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { appRoutes } from '@/lib/routes'

import { LoginForm } from './login-form'

type LoginButtonProps = {
  children?: React.ReactNode
  mode?: 'modal' | 'redirect'
}

export const LoginButton = ({
  children,
  mode = 'redirect',
}: LoginButtonProps) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(appRoutes.auth.login())
  }

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="w-auto border-none bg-transparent p-0">
          <LoginForm />
        </DialogContent>
      </Dialog>
    )
  }

  return <span onClick={handleClick}>{children}</span>
}
