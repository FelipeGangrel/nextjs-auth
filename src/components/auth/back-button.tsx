'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

type BackButtonProps = {
  href: string
  label: string
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button className="w-full font-normal" size="sm" variant="link" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  )
}
