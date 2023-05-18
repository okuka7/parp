export interface ManageMemberUsecase {
  addMember(groupId: string, memberIds: string[]): Promise<void>;
  promoteMember(groupId: string, memberId: string): Promise<void>;
  demoteMember(groupId: string, memberId: string): Promise<void>;
  transferOwnership(groupId: string, memberId: string): Promise<void>;
  removeMember(groupId: string, memberId: string): Promise<void>;
}

export const MANAGE_MEMBER_USECASE = Symbol('MANAGE_MEMBER_USECASE');
