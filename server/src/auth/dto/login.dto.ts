import { z } from 'nestjs-zod/z';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
