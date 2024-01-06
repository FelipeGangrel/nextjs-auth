import { db } from '@/lib/db'

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    return db.verificationToken.findFirst({
      where: { email },
    })
  } catch {
    return null
  }
}

export const getVerificationTokenByToken = async (token: string) => {
  try {
    return db.verificationToken.findUnique({
      where: { token },
    })
  } catch {
    return null
  }
}
