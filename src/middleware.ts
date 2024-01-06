import NextAuth from 'next-auth'

import authConfig from '@/auth.config'

import { apiRoutes, appRoutes } from './lib/routes'

const { auth } = NextAuth(authConfig)

const appAuthRoutes = [
  appRoutes.auth.login(),
  appRoutes.auth.register(),
  appRoutes.auth.error(),
  appRoutes.auth.resetPassword(),
] as string[]

const publicRoutes = [
  '/',
  // both logged in and logged out users can access this route
  appRoutes.auth.newVerification(),
]

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const { pathname } = nextUrl

  const isApiAuthRoute = pathname.startsWith(apiRoutes.auth())
  const isAppAuthRoute = appAuthRoutes.includes(pathname)
  const isPublicRoute = publicRoutes.includes(pathname)

  if (isApiAuthRoute) return null

  if (isAppAuthRoute) {
    if (isLoggedIn) {
      const url = new URL(appRoutes.settings(), nextUrl)
      return Response.redirect(url)
    }
    return null
  }

  if (!isLoggedIn && !isPublicRoute) {
    const url = new URL(appRoutes.auth.login(), nextUrl)
    return Response.redirect(url)
  }

  return null
})

/**
 * Custom matcher from Clerk https://clerk.com/docs/quickstarts/nextjs?#require-authentication-to-access-your-app
 * This will catch all routes except next static files like images, fonts, etc.
 */
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
