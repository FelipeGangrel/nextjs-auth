import { UserRole } from '@prisma/client'
import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
  code: z.string().optional(),
})

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email',
  }),
  password: z.string().min(6, {
    message: 'Minimum 6 characters required',
  }),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
})

export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email',
  }),
})

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Minimum 6 characters required',
  }),
})

export const UpdateSettingsSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(
      z.string().email({
        message: 'Please enter a valid email',
      })
    ),
    password: z.optional(
      z.string().min(6, {
        message: 'Minimum 6 characters required',
      })
    ),
    newPassword: z.optional(
      z.string().min(6, {
        message: 'Minimum 6 characters required',
      })
    ),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false
      }

      return true
    },
    {
      message: 'New password is required when changing password',
      path: ['newPassword'],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false
      }

      return true
    },
    {
      message: 'Current password is required when changing password',
      path: ['password'],
    }
  )
