import { EntityRepository } from '@mikro-orm/core';
import { CreateGroupPort } from '../../application/port/outgoing/create-group.port';
import { LoadGroupPort } from '../../application/port/outgoing/load-group.port';
import { UpdateGroupPort } from '../../application/port/outgoing/update-group.port';
import { Group } from '../../domain/group';

export class GroupPersistenceAdapter
  extends EntityRepository<Group>
  implements LoadGroupPort, CreateGroupPort, UpdateGroupPort
{
  public async findGroupWithMember(id: string): Promise<Group> {
    return await this.findOneOrFail({ id }, { populate: ['member'] });
  }

  public async createGroup(group: Group): Promise<void> {
    this.create(group);
  }

  public async updateGroup(group: Group): Promise<void> {
    this.upsert(group);
  }

  public async deleteGroup(id: string): Promise<void> {
    await this.nativeDelete({ id });
  }

  public async findGroup(id: string): Promise<Group> {
    return await this.findOneOrFail({ id });
  }
}
