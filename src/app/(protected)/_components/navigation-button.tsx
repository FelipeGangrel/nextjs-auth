'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'

type NavigationButtonProps = {
  href: string
  children: React.ReactNode
}

export const NavigationButton = ({ children, href }: NavigationButtonProps) => {
  const pathname = usePathname()

  return (
    <Button asChild variant={pathname === href ? 'default' : 'outline'}>
      <Link href={href}>{children}</Link>
    </Button>
  )
}
