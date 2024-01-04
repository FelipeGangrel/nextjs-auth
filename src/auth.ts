import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'

import authConfig from '@/auth.config'
import { getUserById } from '@/data/user'
import { db } from '@/lib/db'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  /**
   * Why not put this in auth.config.ts?
   *
   * The callbacks are run on the edge (serverless) and
   * we can't use Prisma ORM on the edge.
   */
  callbacks: {
    session: async ({ session, token }) => {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub
        }
        if (token.role) {
          session.user.role = token.role
        }
      }

      return session
    },
    jwt: async ({ token }) => {
      if (!token?.sub) return token

      const user = await getUserById(token.sub)

      if (!user) return token

      token.role = user.role

      return token
    },
  },
  ...authConfig,
})
