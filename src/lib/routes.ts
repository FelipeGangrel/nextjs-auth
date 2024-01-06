export const appRoutes = {
  auth: {
    login: () => '/auth/login' as const,
    register: () => '/auth/register' as const,
    error: () => '/auth/error' as const,
    newVerification: (token: string) => {
      return `/auth/new-verification?token=${token}` as const
    },
    resetPassword: () => `/auth/reset-password` as const,
    newPassword: (token: string) => {
      return `/auth/new-password?token=${token}` as const
    },
  },
  settings: () => '/settings' as const,
}

export const apiRoutes = {
  auth: () => '/api/auth' as const,
}
