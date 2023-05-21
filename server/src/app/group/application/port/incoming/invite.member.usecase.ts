import { InviteMemberCommand } from './command/invite.member.command';

export const INVITE_MEMBER_USECASE = Symbol('InviteMemberUseCase');

export interface InviteMemberUseCase {
  inviteMember(command: InviteMemberCommand): Promise<void>;
}
