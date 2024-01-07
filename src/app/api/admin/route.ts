import { NextResponse } from 'next/server'

import { currentUser } from '@/lib/auth'

export async function GET() {
  const user = await currentUser()

  return new NextResponse(null, {
    status: user?.role === 'ADMIN' ? 200 : 401,
  })
}
