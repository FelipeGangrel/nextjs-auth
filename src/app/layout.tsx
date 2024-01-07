import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

import { auth } from '@/auth'
import { Toaster } from '@/components/ui/sonner'
import { BaseLayoutProps } from '@/types'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next-Auth',
  description: 'An example of NextAuth with Next.js',
}

export default async function RootLayout({ children }: BaseLayoutProps) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  )
}
