export interface DeleteMemberPort {
  deleteMember(groupId: string, memberId: string): Promise<void>;
}

export const DELETE_MEMBER_PORT = Symbol('DELETE_MEMBER_PORT');
