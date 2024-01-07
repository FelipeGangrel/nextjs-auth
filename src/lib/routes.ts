export const appRoutes = {
  auth: {
    login: (callbackUrl?: string) => {
      if (!callbackUrl) return '/auth/login' as const

      return `/auth/login?callbackUrl=${callbackUrl}` as const
    },
    register: () => '/auth/register' as const,
    error: () => '/auth/error' as const,
    newVerification: (token?: string) => {
      if (!token) return `/auth/new-verification` as const

      return `/auth/new-verification?token=${token}` as const
    },
    resetPassword: () => `/auth/reset-password` as const,
    newPassword: (token?: string) => {
      if (!token) return `/auth/new-password` as const

      return `/auth/new-password?token=${token}` as const
    },
  },
  settings: () => '/settings' as const,
  serverExample: () => '/server-example' as const,
  clientExample: () => '/client-example' as const,
  admin: () => '/admin' as const,
}

export const apiRoutes = {
  auth: () => '/api/auth' as const,
}
