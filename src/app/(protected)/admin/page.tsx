'use client'

import { toast } from 'sonner'

import { adminOnly } from '@/actions/admin-only'
import { RoleGate } from '@/components/auth/role-gate'
import { Message } from '@/components/message'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useCurrentUser } from '@/hooks/use-current-user'

export default function AdminPage() {
  const user = useCurrentUser()

  const fetchAdminApiRoute = async () => {
    const res = await fetch('/api/admin')

    if (res.ok) {
      return toast.success('Allowed API route')
    }

    return toast.error('Not allowed API route')
  }

  const executeAdminServerAction = async () => {
    const res = await adminOnly()

    if (res.success) {
      return toast.success('Allowed server action')
    }

    if (res.error) {
      return toast.error('Not allowed server action')
    }
  }

  const data = [
    {
      label: 'Admin only API route',
      content: <Button onClick={fetchAdminApiRoute}>Click to test</Button>,
    },
    {
      label: 'Admin only server action',
      content: (
        <Button onClick={executeAdminServerAction}>Click to test</Button>
      ),
    },
  ]

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">Admin page</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRoles={['ADMIN']}>
          <Message variant="success">
            Hello {user?.name}, you are an admin!
          </Message>
        </RoleGate>
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg border p-3 shadow-sm"
          >
            <p className="text-sm font-medium">{item.label}</p>
            {item.content}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
