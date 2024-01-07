'use client'

import { useSession } from 'next-auth/react'
import { useTransition } from 'react'

import { updateSettings } from '@/actions/update-sessings'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function SettingsPage() {
  const { update } = useSession()
  const [isPending, startTransition] = useTransition()

  const onClick = async () => {
    startTransition(() => {
      updateSettings({ name: 'New name' }).then(() => {
        update()
      })
    })
  }

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">Settings</p>
      </CardHeader>
      <CardContent>
        <Button onClick={onClick} disabled={isPending}>
          Update name
        </Button>
      </CardContent>
    </Card>
  )
}
