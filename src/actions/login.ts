'use server'

import { AuthError } from 'next-auth'
import * as z from 'zod'

import { signIn } from '@/auth'
import { appRoutes } from '@/lib/routes'
import { LoginSchema } from '@/schemas'

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: appRoutes.settings(),
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' }
        default:
          return { error: 'Something went wrong' }
      }
    }

    throw error
  }
}
