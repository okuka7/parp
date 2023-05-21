import { Body, Controller, Param, Post } from '@nestjs/common';
import { InviteMemberCommand } from '../../application/port/incoming/command/invite.member.command';
import { InviteMemberUseCase } from '../../application/port/incoming/invite.member.usecase';
import { InviteMemberDto } from './dto/invite.member.dto';

@Controller('groups')
export class InviteMemberController {
  constructor(private readonly inviteMemberUseCase: InviteMemberUseCase) {}

  @Post(':groupId/invite')
  async inviteMember(
    @Param('groupId') groupId: string,
    @Body() body: InviteMemberDto,
  ): Promise<void> {
    const command = new InviteMemberCommand(groupId, body.emails);
    await this.inviteMemberUseCase.inviteMember(command);
  }
}
