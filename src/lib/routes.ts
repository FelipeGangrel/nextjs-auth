export const appRoutes = {
  auth: {
    login: () => '/auth/login' as const,
    register: () => '/auth/register' as const,
  },
  settings: () => '/settings' as const,
}

export const apiRoutes = {
  auth: () => '/api/auth' as const,
}
