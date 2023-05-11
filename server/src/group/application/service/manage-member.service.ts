import { Injectable } from '@nestjs/common';
import { ManageMemberUsecase } from '../port/incoming/manage-member.usecase';
import { CreateMemberPort } from '../port/outgoing/create-member.port';
import { DeleteMemberPort } from '../port/outgoing/delete-member.port';
import { LoadMemberPort } from '../port/outgoing/load-member.port';
import { UpdateMemberPort } from '../port/outgoing/update-member.port';

@Injectable()
export class ManageMemberService implements ManageMemberUsecase {
  constructor(
    private readonly loadMemberPort: LoadMemberPort,
    private readonly createMemberPort: CreateMemberPort,
    private readonly updateMemberPort: UpdateMemberPort,
    private readonly deleteMemberPort: DeleteMemberPort,
  ) {}

  public async addMember(groupId: string, memberIds: string[]): Promise<void> {
    await this.createMemberPort.createManyMember(groupId, memberIds);
  }

  public async promoteMember(groupId: string, memberId: string): Promise<void> {
    const member = await this.loadMemberPort.findMember(groupId, memberId);
    member.promoteToAdmin();
    await this.updateMemberPort.updateMember(groupId, member);
  }

  public async demoteMember(groupId: string, memberId: string): Promise<void> {
    const member = await this.loadMemberPort.findMember(groupId, memberId);
    member.demoteToMember();
    await this.updateMemberPort.updateMember(groupId, member);
  }

  public async transferOwnership(
    groupId: string,
    memberId: string,
  ): Promise<void> {
    const oldOwner = await this.loadMemberPort.findMember(groupId, memberId);
    const newOwner = await this.loadMemberPort.findMember(groupId, memberId);
    oldOwner.promoteToAdmin();
    newOwner.promoteToOwner();
    await this.updateMemberPort.updateMember(groupId, oldOwner);
  }

  public async removeMember(groupId: string, memberId: string): Promise<void> {
    await this.deleteMemberPort.deleteMember(groupId, memberId);
  }
}
