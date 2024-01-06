'use server'

import { AuthError } from 'next-auth'
import * as z from 'zod'

import { signIn } from '@/auth'
import { getUserByEmail } from '@/data/user'
import { sendVerificationEmail } from '@/lib/mail'
import { appRoutes } from '@/lib/routes'
import { generateVerificationToken } from '@/lib/tokens'
import { LoginSchema } from '@/schemas'

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Invalid credentials' }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email)

    await sendVerificationEmail(email, verificationToken.token)

    return {
      success: 'Confirmation email sent',
    }
  }

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
        case 'OAuthAccountNotLinked':
          return { error: 'Email already used with different provider' }
        default:
          return { error: 'Something went wrong' }
      }
    }

    throw error
  }
}
