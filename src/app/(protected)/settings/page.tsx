'use client'

import { logout } from '@/actions/logout'
import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hooks/use-current-user'

export default function SettingsPage() {
  const user = useCurrentUser()

  const handleSignOut = async () => {
    await logout()
  }

  return (
    <div className="rounded-xl bg-white p-10">
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Button onClick={handleSignOut} variant="destructive">
        Sign Out
      </Button>
    </div>
  )
}
