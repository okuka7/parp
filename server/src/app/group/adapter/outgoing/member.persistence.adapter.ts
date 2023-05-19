import { EntityRepository } from '@mikro-orm/core';
import { DeleteMemberPort } from '../../application/port/outgoing/delete-member.port';
import { LoadMemberPort } from '../../application/port/outgoing/load-member.port';
import { UpdateMemberPort } from '../../application/port/outgoing/update-member.port';
import { Member } from '../../domain/member';

export class MemberPersistenceAdapter
  extends EntityRepository<Member>
  implements LoadMemberPort, UpdateMemberPort, DeleteMemberPort
{
  public async findAllMember(groupId: string): Promise<Member[]> {
    return await this.find({ group: groupId });
  }

  public async updateMember(member: Member): Promise<void> {
    this.upsert(member);
  }

  public async deleteMember(groupId: string, memberId: string): Promise<void> {
    await this.nativeDelete({ user: memberId, group: groupId });
  }

  public async findMember(id: string): Promise<Member> {
    return await this.findOneOrFail({
      user: id,
    });
  }
}
