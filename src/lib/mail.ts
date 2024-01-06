import { Resend } from 'resend'

import { appRoutes } from './routes'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/${appRoutes.auth.newVerification()}?token=${token}`

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
