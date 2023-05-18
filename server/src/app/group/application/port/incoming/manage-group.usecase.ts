import { ChangeGroupNameCommand } from './change-group-name.command';
import { CreateGroupCommand } from './create-group.command';

export interface ManageGroupUsecase {
  createGroup(command: CreateGroupCommand): Promise<void>;
  changeGroupName(command: ChangeGroupNameCommand): Promise<void>;
  deleteGroup(groupId: string, userId: string): Promise<void>;
}

export const MANAGE_GROUP_USECASE = Symbol('MANAGE_GROUP_USECASE');
