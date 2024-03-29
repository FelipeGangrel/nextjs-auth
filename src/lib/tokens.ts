import crypto from 'crypto'
import { v4 as uuidV4 } from 'uuid'

import { getPasswordResetTokenByEmail } from '@/data/password-reset-token'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'
import { getVerificationTokenByEmail } from '@/data/verification-token'

import { db } from './db'

const ONE_HOUR = 60 * 60 * 1000
const ONE_MINUTE = 60 * 1000

export const generateVerificationToken = async (email: string) => {
  const token = uuidV4()
  const expiresAt = new Date(new Date().getTime() + ONE_HOUR)

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
  const expiresAt = new Date(new Date().getTime() + ONE_HOUR)

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

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 999_999).toString()
  const expiresAt = new Date(new Date().getTime() + ONE_MINUTE * 5)

  const existingToken = await getTwoFactorTokenByEmail(email)

  if (existingToken) {
    return db.twoFactorToken.update({
      where: { id: existingToken.id },
      data: { token, expiresAt },
    })
  }

  return db.twoFactorToken.create({
    data: { email, token, expiresAt },
  })
}
