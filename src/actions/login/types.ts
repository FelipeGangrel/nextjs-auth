import * as z from 'zod'

import { LoginSchema } from '@/schemas'

export type LoginFormValues = z.infer<typeof LoginSchema>
