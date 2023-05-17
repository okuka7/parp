import { IsUUID } from 'class-validator';

export class CreateMemberRequestDto {
  @IsUUID('4', { each: true, message: 'MemberIds must be an array of UUID v4' })
  readonly MemberIds: string[];
}
