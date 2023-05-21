import { IsUUID, validateSync } from 'class-validator';

export class JoinMemberCommand {
  @IsUUID(4, { message: 'Invalid group id.' })
  groupId: string;

  @IsUUID(4, { message: 'Invalid user id.' })
  memberId: string;

  constructor(groupId: string, memberId: string) {
    this.groupId = groupId;
    this.memberId = memberId;
    validateSync(this);
  }
}
