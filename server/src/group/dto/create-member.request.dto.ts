import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateMemberRequestSchema = z.object({
  memberIds: z.array(z.string()),
});

export class CreateMemberRequestDto extends createZodDto(
  CreateMemberRequestSchema,
) {}
