import { Member } from '../../../domain/member';

export interface UpdateMemberPort {
  updateMember(member: Member): Promise<void>;
}

export const UPDATE_MEMBER_PORT = Symbol('UPDATE_MEMBER_PORT');
