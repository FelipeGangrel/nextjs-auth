'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'

type NavigationButtonProps = {
  href: string
  children: React.ReactNode
  className?: string
}

export const NavigationButton = ({
  children,
  className,
  href,
}: NavigationButtonProps) => {
  const pathname = usePathname()

  return (
    <Button
      asChild
      variant={pathname === href ? 'default' : 'ghost'}
      className={className}
    >
      <Link href={href}>{children}</Link>
    </Button>
  )
}
