import { v4 as uuidV4 } from 'uuid'

import { getPasswordResetTokenByEmail } from '@/data/password-reset-token'
import { getVerificationTokenByEmail } from '@/data/verification-token'

import { db } from './db'

const TOKEN_EXPIRY_TIME = 60 * 60 * 1000 // 1 hour

export const generateVerificationToken = async (email: string) => {
  const token = uuidV4()
  const expiresAt = new Date(new Date().getTime() + TOKEN_EXPIRY_TIME)

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    return db.verificationToken.update({
      where: { id: existingToken.id },
      data: { token, expiresAt },
    })
  }

  return db.verificationToken.create({
    data: { email, token, expiresAt },
  })
}

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidV4()
  const expiresAt = new Date(new Date().getTime() + TOKEN_EXPIRY_TIME)

  const existingToken = await getPasswordResetTokenByEmail(email)

  if (existingToken) {
    return db.passwordResetToken.update({
      where: { id: existingToken.id },
      data: { token, expiresAt },
    })
  }

  return db.passwordResetToken.create({
    data: { email, token, expiresAt },
  })
}
