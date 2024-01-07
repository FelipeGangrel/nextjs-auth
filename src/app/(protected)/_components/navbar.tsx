'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdOutlineMenu as MenuIcon } from 'react-icons/md'

import { UserButton } from '@/components/auth/user-button'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { appRoutes } from '@/lib/routes'

import { NavigationButton } from './navigation-button'

const NavigationButtons = () => (
  <>
    <NavigationButton href={appRoutes.serverExample()}>Server</NavigationButton>
    <NavigationButton href={appRoutes.clientExample()}>Client</NavigationButton>
    <NavigationButton href={appRoutes.admin()}>Admin</NavigationButton>
    <NavigationButton href={appRoutes.settings()}>Settings</NavigationButton>
  </>
)

export const Navbar = () => {
  const pathname = usePathname()

  const [isMounted, setIsMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <nav className="flex w-full items-center rounded-xl bg-secondary p-4 shadow-sm">
      <div className="flex sm:hidden">
        <Button variant="outline" size="icon" onClick={() => setMenuOpen(true)}>
          <MenuIcon className="h-4 w-4" />
        </Button>
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetContent side="left" className="pb-2 pt-20">
            <div className="flex flex-col gap-y-4">
              <NavigationButtons />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden gap-x-2 sm:flex">
        <NavigationButtons />
      </div>
      <div className="ml-auto">
        <UserButton />
      </div>
    </nav>
  )
}
