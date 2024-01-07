'use server'

import { currentUser } from '@/lib/auth'

export const adminOnly = async () => {
  const user = await currentUser()

  if (user?.role !== 'ADMIN') {
    return { error: 'Unauthorized' }
  }

  return { success: 'Authorized' }
}
