import { UserRole } from '@prisma/client'
import { DefaultSession } from 'next-auth'

type ExtendedUser = {
  role: UserRole
} & DefaultSession['user']

// for useSession hook and auth function
declare module 'next-auth/types' {
  interface Session {
    user: ExtendedUser
  }
}

// for prisma adapter
declare module '@auth/core/types' {
  interface Session {
    user: ExtendedUser
  }
}
