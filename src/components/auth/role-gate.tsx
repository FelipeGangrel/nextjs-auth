'use client'

import { UserRole } from '@prisma/client'

import { useCurrentUser } from '@/hooks/use-current-user'

import { Message } from '../message'

type RoleGateProps = {
  children: React.ReactNode
  fallback?: React.ReactNode
  allowedRoles: UserRole[]
}

export const RoleGate = ({
  children,
  allowedRoles,
  fallback = null,
}: RoleGateProps) => {
  const user = useCurrentUser()

  if (!user) return <>{fallback}</>

  if (![...allowedRoles].includes(user.role)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
