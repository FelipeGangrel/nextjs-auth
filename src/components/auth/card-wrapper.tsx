'use client'

import { Header } from '@/components/header'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

import { BackButton } from './back-button'
import { SocialButtons } from './social-buttons'

type CardWrapperProps = {
  backButtonHref: string
  backButtonLabel: string
  children: React.ReactNode
  headerLabel: string
  showSocialButtons?: boolean
}

export const CardWrapper = ({
  backButtonHref,
  backButtonLabel,
  children,
  headerLabel,
  showSocialButtons,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocialButtons && (
        <CardFooter>
          <SocialButtons />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}
