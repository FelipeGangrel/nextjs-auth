'use client'

import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons'
import { cva, VariantProps } from 'class-variance-authority'
import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

const message = cva('flex items-center gap-x-2 rounded-md p-3 text-sm', {
  variants: {
    variant: {
      error: 'bg-destructive/15 text-destructive',
      success: 'bg-emerald-500/15 text-emerald-500',
    },
  },
  defaultVariants: {
    variant: 'success',
  },
})

type MessageProps = {
  message?: string
} & VariantProps<typeof message> &
  HTMLAttributes<HTMLDivElement>

export const Message = ({
  children,
  className,
  variant = 'success',
  ...props
}: MessageProps) => {
  if (!message) return null

  return (
    <div {...props} className={cn(message({ variant }), className)}>
      {variant === 'error' && <ExclamationTriangleIcon className="h- w-4" />}
      {variant === 'success' && <CheckCircledIcon className="h-4 w-4" />}
      <p>{children}</p>
    </div>
  )
}
