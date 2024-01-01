export const appRoutes = {
  auth: {
    login: () => '/auth//login' as const,
    register: () => '/auth//register' as const,
  },
}
