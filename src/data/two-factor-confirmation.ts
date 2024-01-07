import { db } from '@/lib/db'

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    return db.twoFactorConfirmation.findUnique({
      where: { userId },
    })
  } catch {
    return null
  }
}
