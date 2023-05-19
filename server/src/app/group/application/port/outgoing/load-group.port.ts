import { Group } from '../../../domain/group';

export interface LoadGroupPort {
  findGroup(id: string): Promise<Group>;
  findGroupWithMember(id: string): Promise<Group>;
}

export const LOAD_GROUP_PORT = Symbol('LOAD_GROUP_PORT');
