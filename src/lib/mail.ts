import { Resend } from 'resend'

import { appRoutes } from './routes'

const {
  RESEND_API_KEY,
  NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_DOMAIN_VERIFIED,
  NEXT_PUBLIC_DEFAULT_MAIL_TO,
} = process.env

const resend = new Resend(RESEND_API_KEY)

const domain = NEXT_PUBLIC_APP_URL

const getSafeEmail = (email: string) => {
  if (NEXT_PUBLIC_DOMAIN_VERIFIED.toLocaleLowerCase() === 'true') {
    return email
  }

  return NEXT_PUBLIC_DEFAULT_MAIL_TO
}

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/${appRoutes.auth.newVerification(token)}`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: getSafeEmail(email),
    subject: 'Confirm your email address',
    html: `
    <div>
      <p>Please verify your email address by clicking on the link below:</p>
      <p>
        <a href="${confirmLink}">${confirmLink}</a>
      </p>
    </div>
    `,
  })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/${appRoutes.auth.newPassword(token)}`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: getSafeEmail(email),
    subject: 'Reset your password',
    html: `
    <div>
      <p>Please reset your password by clicking on the link below:</p>
      <p>
        <a href="${resetLink}">${resetLink}</a>
      </p>
    </div>
    `,
  })
}

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: getSafeEmail(email),
    subject: '2FA code',
    html: `
    <div>
      <p>This is your 2FA code:</p>
      <p>
        ${token}
      </p>
    </div>
    `,
  })
}
