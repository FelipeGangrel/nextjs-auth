'use client'

import { FaGithub as GithubIcon } from 'react-icons/fa'
import { FcGoogle as GoogleIcon } from 'react-icons/fc'

import { Button } from '@/components/ui/button'

export const SocialButtons = () => {
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button size="lg" variant="outline" className="w-full" onClick={() => {}}>
        <GoogleIcon className="h-5 w-5" />
      </Button>
      <Button size="lg" variant="outline" className="w-full" onClick={() => {}}>
        <GithubIcon className="h-5 w-5" />
      </Button>
    </div>
  )
}
