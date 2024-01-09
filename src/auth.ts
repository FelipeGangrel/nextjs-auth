import { PrismaAdapter } from '@auth/prisma-adapter'
import { UserRole } from '@prisma/client'
import NextAuth from 'next-auth'

import authConfig from '@/auth.config'
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation'
import { getUserById } from '@/data/user'
import { db } from '@/lib/db'

import { getAccountByUserId } from './data/account'
import { appRoutes } from './lib/routes'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  pages: {
    signIn: appRoutes.auth.login(),
    error: appRoutes.auth.error(),
  },
  events: {
    linkAccount: async ({ user }) => {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
  /**
   * Why not put this in auth.config.ts?
   *
   * The callbacks are run on the edge (serverless) and
   * we can't use Prisma ORM on the edge.
   */
  callbacks: {
    signIn: async ({ account, user, profile }) => {
      const existingUser = await getUserById(user.id)

      // For GitHub OAuth, we need to fetch the avatar_url
      if (!existingUser?.image && typeof profile?.avatar_url === 'string') {
        await db.user.update({
          where: { id: user.id },
          data: { image: profile.avatar_url },
        })
      }

      // For Google OAuth, we need to fetch the picture
      if (!existingUser?.image && typeof profile?.picture === 'string') {
        await db.user.update({
          where: { id: user.id },
          data: { image: profile.picture },
        })
      }

      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true

      if (!existingUser?.emailVerified) return false

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        )

        if (!twoFactorConfirmation) return false

        // delete the 2FA confirmation for the next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        })
      }

      return true
    },
    session: async ({ session, token }) => {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub
        }
        session.user.email = token.email
        session.user.role = token.role as UserRole
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
        session.user.isOAuth = token.isOAuth as boolean
      }

      return session
    },
    jwt: async ({ token }) => {
      if (!token?.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      token = {
        ...token,
        ...existingUser,
        isOAuth: !!existingAccount,
      }

      return token
    },
  },
  ...authConfig,
})
