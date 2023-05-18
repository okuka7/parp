import { Group } from 'src/group/domain/group';

export interface UpdateGroupPort {
  updateGroup(group: Group): Promise<void>;
  deleteGroup(id: string): Promise<void>;
}

export const UPDATE_GROUP_PORT = Symbol('UPDATE_GROUP_PORT');
