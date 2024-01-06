import { db } from '@/lib/db'

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    return db.passwordResetToken.findFirst({
      where: { email },
    })
  } catch {
    return null
  }
}

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    return db.passwordResetToken.findUnique({
      where: { token },
    })
  } catch {
    return null
  }
}
