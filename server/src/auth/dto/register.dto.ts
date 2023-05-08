import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  phoneNumber: z
    .string()
    .regex(/^010-\d{4}-\d{4}$/)
    .describe('010-0000-0000'),
});

export class RegisterDto extends createZodDto(RegisterSchema) {}
