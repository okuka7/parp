import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class InviteMemberDto {
  @ApiProperty()
  @IsEmail({}, { each: true })
  emails: string[];
}
