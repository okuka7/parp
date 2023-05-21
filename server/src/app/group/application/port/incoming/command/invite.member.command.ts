import { IsEmail, IsUUID, validateSync } from 'class-validator';

export class InviteMemberCommand {
  @IsUUID(4, { message: 'Invalid group id.' })
  groupId: string;

  @IsEmail({}, { message: 'Invalid email.', each: true })
  emails: string[];

  constructor(groupId: string, emails: string[]) {
    this.groupId = groupId;
    this.emails = emails;
    validateSync(this);
  }
}
