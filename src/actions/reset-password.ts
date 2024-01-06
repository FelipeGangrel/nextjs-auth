'use server'

import * as z from 'zod'

import { getUserByEmail } from '@/data/user'
import { ResetPasswordSchema } from '@/schemas'

export const resetPassword = async (
  data: z.infer<typeof ResetPasswordSchema>
) => {
  const validatedFields = ResetPasswordSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: 'User not found' }
  }

  return { success: 'Reset email sent' }
}
