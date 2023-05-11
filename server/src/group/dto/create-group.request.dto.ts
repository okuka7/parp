import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateGroupRequestSchema = z.object({
  name: z.string(),
});

export class CreateGroupRequestDto extends createZodDto(
  CreateGroupRequestSchema,
) {}
