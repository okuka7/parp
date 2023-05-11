import { Group } from 'src/group/domain/group';
import { Member } from 'src/group/domain/member';

export interface GetGroupQuery {
  getGroup(id: string): Promise<Group>;
  getMembers(id: string): Promise<Member[]>;
}

export const GET_GROUP_QUERY = Symbol('GET_GROUP_QUERY');
