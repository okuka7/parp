import { Inject, Injectable } from '@nestjs/common';
import { Group } from '../../domain/group';
import { Member } from '../../domain/member';
import { ChangeGroupNameCommand } from '../port/incoming/change-group-name.command';
import { CreateGroupCommand } from '../port/incoming/create-group.command';
import { ManageGroupUsecase } from '../port/incoming/manage-group.usecase';
import {
  CreateGroupPort,
  CREATE_GROUP_PORT,
} from '../port/outgoing/create-group.port';
import {
  LoadGroupPort,
  LOAD_GROUP_PORT,
} from '../port/outgoing/load-group.port';
import {
  LoadMemberPort,
  LOAD_MEMBER_PORT,
} from '../port/outgoing/load-member.port';
import {
  UpdateGroupPort,
  UPDATE_GROUP_PORT,
} from '../port/outgoing/update-group.port';

@Injectable()
export class ManageGroupService implements ManageGroupUsecase {
  constructor(
    @Inject(LOAD_GROUP_PORT) private readonly loadGroupPort: LoadGroupPort,
    @Inject(CREATE_GROUP_PORT)
    private readonly createGroupPort: CreateGroupPort,
    @Inject(UPDATE_GROUP_PORT)
    private readonly updateGroupPort: UpdateGroupPort,
    @Inject(LOAD_MEMBER_PORT) private readonly loadMemberPort: LoadMemberPort,
  ) {}

  public async createGroup(command: CreateGroupCommand): Promise<void> {
    const group = Group.create(command.name);
    group.addMember(Member.create(command.ownerId, group.id));
    await this.createGroupPort.createGroup(group);
  }

  public async changeGroupName(command: ChangeGroupNameCommand): Promise<void> {
    const [group, member] = await Promise.all([
      this.loadGroupPort.findGroup(command.groupId),
      this.loadMemberPort.findMember(command.groupId, command.userId),
    ]);

    if (!member.isAdmin()) {
      throw new Error();
    }

    group.changeName(command.name);
    await this.updateGroupPort.updateGroup(group);
  }

  public async deleteGroup(groupId: string, userId: string): Promise<void> {
    const member = await this.loadMemberPort.findMember(groupId, userId);

    if (!member.isOwner()) {
      throw new Error();
    }

    await this.updateGroupPort.deleteGroup(groupId);
  }
}
