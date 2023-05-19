import { Group } from '../../../domain/group';

export interface CreateGroupPort {
  createGroup(group: Group): Promise<void>;
}

export const CREATE_GROUP_PORT = Symbol('CREATE_GROUP_PORT');
