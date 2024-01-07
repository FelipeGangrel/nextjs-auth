import { Session } from 'next-auth/types'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

type UserInfoProps = {
  user?: Session['user']
  label: string
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  const data = [
    {
      label: 'ID',
      value: user?.id,
    },
    {
      label: 'Name',
      value: user?.name,
    },
    {
      label: 'Email',
      value: user?.email,
    },
    {
      label: 'Image',
      value: user?.image || 'No image',
    },
    {
      label: '2FA Enabled',
      value: user?.isTwoFactorEnabled ? 'On' : 'Off',
    },
  ]

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map(({ label, value }) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-lg border p-3 shadow-sm"
          >
            <p className="text-sm font-medium">{label}</p>
            <p className="max-w-[240px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs">
              {value}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
