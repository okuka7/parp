import { Member } from 'src/group/domain/member';

export interface UpdateMemberPort {
  updateMember(groupId: string, member: Member): Promise<void>;
}

export const UPDATE_MEMBER_PORT = Symbol('UPDATE_MEMBER_PORT');
