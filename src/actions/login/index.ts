'use server'

import { LoginSchema } from '@/schemas'

import { LoginFormValues } from './types'

export const login = async (data: LoginFormValues) => {
  const validatedFields = LoginSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  return {
    success: 'Email sent',
  }
}
