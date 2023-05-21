import { Inject } from '@nestjs/common';
import { InviteMemberCommand } from '../port/incoming/command/invite.member.command';
import { JoinMemberCommand } from '../port/incoming/command/join.member.command';
import { InviteMemberUseCase } from '../port/incoming/invite.member.usecase';
import { JoinMemberUseCase } from '../port/incoming/join.member.usecase';
import {
  CreateMemberPort,
  CREATE_MEMBER_PORT,
} from '../port/outgoing/create.member.port';
import {
  LoadGroupPort,
  LOAD_GROUP_PORT,
} from '../port/outgoing/load-group.port';
import {
  SendInvitationPort,
  SEND_INVITATION_PORT,
} from '../port/outgoing/send.invitation.port';
import * as crypto from 'crypto';

export class AddMemberService
  implements InviteMemberUseCase, JoinMemberUseCase
{
  constructor(
    @Inject(SEND_INVITATION_PORT)
    private readonly sendMailPort: SendInvitationPort,
    @Inject(LOAD_GROUP_PORT)
    private readonly loadGroupPort: LoadGroupPort,
    @Inject(CREATE_MEMBER_PORT)
    private readonly createMemberPort: CreateMemberPort,
  ) {}

  async inviteMember(command: InviteMemberCommand): Promise<void> {
    const group = await this.loadGroupPort.findGroup(command.groupId);
    const url = this.generateUrl(group.id);

    await Promise.all(
      command.emails.map((email) =>
        this.sendMailPort.sendInviteMail(email, url, group.name),
      ),
    );
  }

  async joinMember({ groupId, memberId }: JoinMemberCommand): Promise<void> {
    await this.createMemberPort.createMember(groupId, memberId);
  }

  private generateUrl(groupId: string): string {
    const cipher = crypto.createCipheriv('aes-192-ccm', 'a password', 'salt', {
      authTagLength: 16,
    });
    let encrypted = cipher.update(`${groupId}}`, 'utf8', 'hex');
    encrypted += cipher.final('base64url');

    return `http://localhost:3000/groups/${groupId}/join/${encrypted}`;
  }
}
