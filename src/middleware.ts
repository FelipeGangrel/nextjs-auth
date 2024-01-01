import NextAuth from 'next-auth'

import authConfig from '@/auth.config'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isLoggedIn = !!req.auth

  console.log({
    route: req.nextUrl.pathname,
    isLoggedIn,
  })
})

/**
 * Custom matcher from Clerk https://clerk.com/docs/quickstarts/nextjs?#require-authentication-to-access-your-app
 * This will catch all routes except next static files like images, fonts, etc.
 */
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
