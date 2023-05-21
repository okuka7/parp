import { JoinMemberCommand } from './command/join.member.command';

export const JOIN_MEMBER_USECASE = Symbol('JoinMemberUseCase');

export interface JoinMemberUseCase {
  joinMember(command: JoinMemberCommand): Promise<void>;
}
