export interface ManageMemberUsecase {
  promoteMember(groupId: string, memberId: string): Promise<void>;
  demoteMember(groupId: string, memberId: string): Promise<void>;
  transferOwnership(groupId: string, memberId: string): Promise<void>;
  removeMember(groupId: string, memberId: string): Promise<void>;
}

export const MANAGE_MEMBER_USECASE = Symbol('MANAGE_MEMBER_USECASE');
