import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { getUserByEmail } from '@/data/user'
import { LoginSchema } from '@/schemas/'

export default {
  providers: [
    Credentials({
      name: 'Credentials',
      /**
       * Its okay to use Prisma ORM inside the authorize function because
       * it will only run on the server, not the edge (serverless).
       *
       * We cannot say the same for the callback functions,
       * which is why we moved them to the auth.ts file.
       */
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await getUserByEmail(email)

          if (!user || !user.password) {
            return null
          }

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (passwordsMatch) {
            return user
          }
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig
