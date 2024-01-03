import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'

export default async function SettingsPage() {
  const session = await auth()

  const handleSignOut = async () => {
    'use server'

    await signOut()
  }

  return (
    <form action={handleSignOut}>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Button type="submit" variant="destructive">
        Sign Out
      </Button>
    </form>
  )
}
