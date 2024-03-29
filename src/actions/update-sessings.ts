'use server'

import bcrypt from 'bcryptjs'
import * as z from 'zod'

import { update } from '@/auth'
import { getUserByEmail, getUserById } from '@/data/user'
import { currentUser } from '@/lib/auth'
import { db } from '@/lib/db'
import { sendVerificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/tokens'
import { UpdateSettingsSchema } from '@/schemas'

export const updateSettings = async (
  values: z.infer<typeof UpdateSettingsSchema>
) => {
  const user = await currentUser()

  if (!user) return { error: 'Unauthorized!' }

  const dbUser = await getUserById(user.id)

  if (!dbUser) return { error: 'Unauthorized!' }

  if (user.isOAuth) {
    values.email = undefined
    values.password = undefined
    values.newPassword = undefined
    values.isTwoFactorEnabled = undefined
  }

  let verificationEmilSent = false

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email)

    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email already in use!' }
    }

    const verificationToken = await generateVerificationToken(values.email)
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )

    verificationEmilSent = true
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    )

    if (!passwordsMatch) return { error: 'Incorrect password!' }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10)

    values.password = hashedPassword
    values.newPassword = undefined
  }

  const updatedUser = await db.user.update({
    where: { id: user.id },
    data: {
      ...values,
      ...(verificationEmilSent && {
        emailVerified: undefined,
      }),
    },
  })

  await update({
    user: updatedUser,
  })

  if (verificationEmilSent) {
    return { success: 'Settings updated. Verification email sent!' }
  }

  return { success: 'Settings updated' }
}
