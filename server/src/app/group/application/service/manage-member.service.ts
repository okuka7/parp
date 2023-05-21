import { Inject, Injectable } from '@nestjs/common';
import { Transactionl } from 'src/common/decorator/transaction.decorator';
import { ManageMemberUsecase } from '../port/incoming/manage-member.usecase';
import {
  DeleteMemberPort,
  DELETE_MEMBER_PORT,
} from '../port/outgoing/delete-member.port';
import {
  LoadMemberPort,
  LOAD_MEMBER_PORT,
} from '../port/outgoing/load-member.port';
import {
  UpdateMemberPort,
  UPDATE_MEMBER_PORT,
} from '../port/outgoing/update-member.port';

@Injectable()
export class ManageMemberService implements ManageMemberUsecase {
  constructor(
    @Inject(LOAD_MEMBER_PORT)
    private readonly loadMemberPort: LoadMemberPort,
    @Inject(UPDATE_MEMBER_PORT)
    private readonly updateMemberPort: UpdateMemberPort,
    @Inject(DELETE_MEMBER_PORT)
    private readonly deleteMemberPort: DeleteMemberPort,
  ) {}

  public async promoteMember(groupId: string, memberId: string): Promise<void> {
    const member = await this.loadMemberPort.findMember(groupId, memberId);
    member.promoteToAdmin();
    await this.updateMemberPort.updateMember(member);
  }

  public async demoteMember(groupId: string, memberId: string): Promise<void> {
    const member = await this.loadMemberPort.findMember(groupId, memberId);
    member.demoteToMember();
    await this.updateMemberPort.updateMember(member);
  }

  @Transactionl()
  public async transferOwnership(
    groupId: string,
    memberId: string,
  ): Promise<void> {
    const oldOwner = await this.loadMemberPort.findMember(groupId, memberId);
    const newOwner = await this.loadMemberPort.findMember(groupId, memberId);
    oldOwner.promoteToAdmin();
    newOwner.promoteToOwner();
    await this.updateMemberPort.updateMember(oldOwner);
  }

  public async removeMember(groupId: string, memberId: string): Promise<void> {
    await this.deleteMemberPort.deleteMember(groupId, memberId);
  }
}
