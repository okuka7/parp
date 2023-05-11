export interface CreateMemberPort {
  createMember(groupId: string, memberId: string): Promise<void>;
  createManyMember(groupId: string, memberIds: string[]): Promise<void>;
}

export const CREATE_MEMBER_PORT = Symbol('CREATE_MEMBER_PORT');
