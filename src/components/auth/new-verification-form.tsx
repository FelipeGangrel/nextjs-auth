'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'

import { newVerification } from '@/actions/new-verification'
import { Message } from '@/components/message'
import { appRoutes } from '@/lib/routes'

import { CardWrapper } from './card-wrapper'

export const NewVerificationForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  )

  const verifyEmail = useCallback(() => {
    if (!token) {
      return setErrorMessage('Missing token!')
    }

    newVerification(token)
      .then((response) => {
        setErrorMessage(response.error)
        setSuccessMessage(response.success)
      })
      .catch(() => {
        setErrorMessage('Something went wrong!')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [token])

  useEffect(() => {
    verifyEmail()
  }, [verifyEmail])

  return (
    <CardWrapper
      headerLabel="Completing your verification"
      backButtonLabel="Back to login"
      backButtonHref={appRoutes.auth.login()}
    >
      <div className="flex w-full items-center justify-center">
        {loading && <BeatLoader />}
        {errorMessage && (
          <Message className="w-full" variant="error">
            {errorMessage}
          </Message>
        )}
        {successMessage && (
          <Message className="w-full" variant="success">
            {successMessage}
          </Message>
        )}
      </div>
    </CardWrapper>
  )
}
