import { Poppins } from 'next/font/google'

import { LoginButton } from '@/components/auth/login-button'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

export default function Home() {
  return (
    <main className="default-gradient flex h-full flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            'text-6xl font-semibold text-white drop-shadow-md',
            poppins.className
          )}
        >
          Auth
        </h1>
        <p className="text-lg text-white">A simple authentication service</p>
        <div>
          <LoginButton>
            <Button size="lg" variant="secondary">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  )
}
