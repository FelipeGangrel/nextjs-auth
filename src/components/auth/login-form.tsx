import { appRoutes } from '@/lib/routes'

import { CardWrapper } from './card-wrapper'

export const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref={appRoutes.auth.register()}
      showSocialButtons
    >
      Login form
    </CardWrapper>
  )
}
