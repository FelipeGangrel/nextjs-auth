'use client'

import { UserButton } from '@/components/auth/user-button'
import { appRoutes } from '@/lib/routes'

import { NavigationButton } from './navigation-button'

export const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between rounded-xl bg-secondary p-4 shadow-sm">
      <div className="flex gap-x-2">
        <NavigationButton href={appRoutes.serverExample()}>
          Server
        </NavigationButton>
        <NavigationButton href={appRoutes.clientExample()}>
          Client
        </NavigationButton>
        <NavigationButton href={appRoutes.admin()}>Admin</NavigationButton>
        <NavigationButton href={appRoutes.settings()}>
          Settings
        </NavigationButton>
      </div>
      <UserButton />
    </nav>
  )
}
