'use client'

import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { FaGithub as GithubIcon } from 'react-icons/fa'
import { FcGoogle as GoogleIcon } from 'react-icons/fc'

import { Button } from '@/components/ui/button'
import { appRoutes } from '@/lib/routes'

export const SocialButtons = () => {
  const searchParams = useSearchParams()

  const callbackUrl = searchParams.get('callbackUrl')

  const handleClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: callbackUrl || appRoutes.settings(),
    })
  }

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => handleClick('google')}
      >
        <GoogleIcon className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => handleClick('github')}
      >
        <GithubIcon className="h-5 w-5" />
      </Button>
    </div>
  )
}
