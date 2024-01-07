'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { login } from '@/actions/login'
import { Message } from '@/components/message'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { appRoutes } from '@/lib/routes'
import { LoginSchema } from '@/schemas'

import { CardWrapper } from './card-wrapper'

type FieldValues = z.infer<typeof LoginSchema>

export const LoginForm = () => {
  const searchParams = useSearchParams()

  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already used with different provider'
      : undefined

  const [isPending, startTransition] = useTransition()
  const [show2FA, setShow2FA] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(urlError)
  const [successMessage, setSuccessMessage] = useState<string | undefined>()

  const form = useForm<FieldValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      code: '',
    },
  })

  const handleSubmit = (values: FieldValues) => {
    setErrorMessage(undefined)
    setSuccessMessage(undefined)
    startTransition(() => {
      login(values)
        .then((response) => {
          if (response?.error) {
            form.reset()
            setErrorMessage(response.error)
          }

          if (response?.success) {
            form.reset()
            setSuccessMessage(response.success)
          }

          if (response?.twoFactor) {
            setShow2FA(true)
          }
        })
        .catch(() => {
          setErrorMessage('Something went wrong')
        })
    })
  }

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref={appRoutes.auth.register()}
      showSocialButtons
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            {!show2FA && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="john.doe@example.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          type="password"
                          placeholder="******"
                        />
                      </FormControl>
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href={appRoutes.auth.resetPassword()}>
                          Forgot password?
                        </Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {show2FA && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two factor code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="123456"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          {errorMessage && <Message variant="error">{errorMessage}</Message>}
          {successMessage && (
            <Message variant="success">{successMessage}</Message>
          )}
          <Button disabled={isPending} type="submit" className="w-full">
            {show2FA ? 'Verify' : 'Login'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
