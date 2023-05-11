import { Member } from 'src/group/domain/member';

export interface GetMemberQuery {
  getMember(groupId: string, memberId: string): Promise<Member>;
  getAllMembers(groupId: string): Promise<Member[]>;
}

export const GET_MEMBER_QUERY = Symbol('GET_MEMBER_QUERY');
