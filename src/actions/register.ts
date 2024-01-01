'use server'

import bcrypt from 'bcrypt'
import * as z from 'zod'

import { db } from '@/lib/db'
import { RegisterSchema } from '@/schemas'

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { email, name, password } = validatedFields.data

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  })

  if (existingUser) {
    return { error: 'Email already in use!' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  })

  // TODO: Send verification token email

  return {
    success: 'User created!',
  }
}
