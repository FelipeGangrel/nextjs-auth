'use client'

import { UserRole } from '@prisma/client'

import { useCurrentUser } from '@/hooks/use-current-user'

import { Message } from '../message'

type RoleGateProps = {
  children: React.ReactNode
  allowedRoles: UserRole[]
}

const Fallback = () => {
  return (
    <Message variant="error">You are not allowed to see this content.</Message>
  )
}

export const RoleGate = ({ children, allowedRoles }: RoleGateProps) => {
  const user = useCurrentUser()

  if (!user) return <Fallback />

  if (![...allowedRoles].includes(user.role)) {
    return <Fallback />
  }

  return <>{children}</>
}
