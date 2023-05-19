import { Member } from '../../../domain/member';

export interface LoadMemberPort {
  findMember(groupId: string, memberId: string): Promise<Member>;
  findAllMember(groupId: string): Promise<Member[]>;
}

export const LOAD_MEMBER_PORT = Symbol('LoadMemberPort');
