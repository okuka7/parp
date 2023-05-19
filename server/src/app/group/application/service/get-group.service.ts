import { Inject, Injectable } from '@nestjs/common';
import { Group } from '../../domain/group';
import { Member } from '../../domain/member';
import { GetGroupQuery } from '../port/incoming/get-group.query';
import {
  LoadGroupPort,
  LOAD_GROUP_PORT,
} from '../port/outgoing/load-group.port';
import {
  LoadMemberPort,
  LOAD_MEMBER_PORT,
} from '../port/outgoing/load-member.port';

@Injectable()
export class GetGroupService implements GetGroupQuery {
  constructor(
    @Inject(LOAD_GROUP_PORT) private readonly loadGroupPort: LoadGroupPort,
    @Inject(LOAD_MEMBER_PORT) private readonly loadMemberPort: LoadMemberPort,
  ) {}

  public async getGroup(id: string): Promise<Group> {
    const group = await this.loadGroupPort.findGroupWithMember(id);
    if (!group) {
      throw new Error();
    }
    return group;
  }

  public async getMembers(id: string): Promise<Member[]> {
    return await this.loadMemberPort.findAllMember(id);
  }
}
