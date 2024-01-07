'use server'

import * as z from 'zod'

import { getUserById } from '@/data/user'
import { currentUser } from '@/lib/auth'
import { db } from '@/lib/db'
import { UpdateSettingsSchema } from '@/schemas'

export const updateSettings = async (
  data: z.infer<typeof UpdateSettingsSchema>
) => {
  const user = await currentUser()

  if (!user) return { error: 'Unauthorized!' }

  const dbUser = await getUserById(user.id)

  if (!dbUser) return { error: 'Unauthorized!' }

  await db.user.update({
    where: { id: user.id },
    data: {
      ...data,
    },
  })

  return { success: 'Settings updated' }
}
