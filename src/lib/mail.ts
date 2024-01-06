import { Resend } from 'resend'

import { appRoutes } from './routes'

const resend = new Resend(process.env.RESEND_API_KEY)
const baseUrl = 'http://localhost:3000'

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${baseUrl}/${appRoutes.auth.newVerification(token)}`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
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
  const resetLink = `${baseUrl}/${appRoutes.auth.newPassword(token)}`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
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
