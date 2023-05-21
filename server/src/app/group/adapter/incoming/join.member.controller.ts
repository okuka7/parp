import { Controller, Inject, Param, Post, Session } from '@nestjs/common';
import { JoinMemberCommand } from '../../application/port/incoming/command/join.member.command';
import {
  JoinMemberUseCase,
  JOIN_MEMBER_USECASE,
} from '../../application/port/incoming/join.member.usecase';

@Controller('groups')
export class JoinGroupController {
  constructor(
    @Inject(JOIN_MEMBER_USECASE)
    private readonly joinGroupUsecase: JoinMemberUseCase,
  ) {}

  @Post(':groupId/join')
  async joinGroup(
    @Param('groupId') groupId: string,
    @Session() session: Record<string, any>,
  ): Promise<void> {
    const command = new JoinMemberCommand(groupId, session.userId);
    await this.joinGroupUsecase.joinMember(command);
  }
}
