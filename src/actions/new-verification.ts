'use server'

import { getUserByEmail } from '@/data/user'
import { getVerificationTokenByToken } from '@/data/verification-token'
import { db } from '@/lib/db'

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) {
    return { error: 'Invalid token!' }
  }

  const hasExpired = new Date() > existingToken.expiresAt

  if (hasExpired) {
    return { error: 'Token has expired!' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: 'User not found!' }
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      /**
       * Why update the email?
       *
       * When a user changes their email through the settings page,
       * we will send a new verification email to the new email address and
       * then we need to update the email address for this user upon verification.
       */
      email: existingToken.email,
    },
  })

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  })

  return { success: 'Email verified!' }
}
