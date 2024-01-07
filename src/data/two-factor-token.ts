import { db } from '@/lib/db'

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    return db.twoFactorToken.findFirst({
      where: { email },
    })
  } catch {
    return null
  }
}

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    return db.twoFactorToken.findUnique({
      where: { token },
    })
  } catch {
    return null
  }
}
