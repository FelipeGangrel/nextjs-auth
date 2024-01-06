'use server'

import bcrypt from 'bcryptjs'
import * as z from 'zod'

import { getPasswordResetTokenByToken } from '@/data/password-reset-token'
import { getUserByEmail } from '@/data/user'
import { db } from '@/lib/db'
import { NewPasswordSchema } from '@/schemas'

export const newPassword = async (
  data: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: 'Missing token' }
  }

  const validatedFields = NewPasswordSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { password } = validatedFields.data

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) {
    return { error: 'Invalid token' }
  }

  const hasExpired = new Date() > existingToken.expiresAt

  if (hasExpired) {
    return { error: 'Token has expired' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: 'User not found' }
  }

  const newHashedPassword = await bcrypt.hash(password, 10)

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: newHashedPassword },
  })

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  })

  return { success: 'Password updated' }
}
