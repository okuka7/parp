import { Group } from 'src/group/domain/group';

export interface LoadGroupPort {
  findGroup(id: string): Promise<Group>;
  findGroupWithMembers(id: string): Promise<Group>;
}

export const LOAD_GROUP_PORT = Symbol('LOAD_GROUP_PORT');
