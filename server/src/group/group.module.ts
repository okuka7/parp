import { Module } from '@nestjs/common';
import { multiProvide } from 'src/lib/multiProvide';
import { GroupPrismaAdapter } from './adapter/outgoing/group.prisma.adapter';
import { MemberPrismaAdapter } from './adapter/outgoing/member.prisma.adapter';
import { GET_GROUP_QUERY } from './application/port/incoming/get-group.query';
import { MANAGE_GROUP_USECASE } from './application/port/incoming/manage-group.usecase';
import { MANAGE_MEMBER_USECASE } from './application/port/incoming/manage-member.usecase';
import { CREATE_GROUP_PORT } from './application/port/outgoing/create-group.port';
import { CREATE_MEMBER_PORT } from './application/port/outgoing/create-member.port';
import { DELETE_MEMBER_PORT } from './application/port/outgoing/delete-member.port';
import { LOAD_GROUP_PORT } from './application/port/outgoing/load-group.port';
import { LOAD_MEMBER_PORT } from './application/port/outgoing/load-member.port';
import { UPDATE_GROUP_PORT } from './application/port/outgoing/update-group.port';
import { UPDATE_MEMBER_PORT } from './application/port/outgoing/update-member.port';
import { GetGroupService } from './application/service/get-group.service';
import { ManageGroupService } from './application/service/manage-group.service';
import { ManageMemberService } from './application/service/manage-member.service';

@Module({
  providers: [
    ...multiProvide({
      provide: [LOAD_GROUP_PORT, CREATE_GROUP_PORT, UPDATE_GROUP_PORT],
      useClass: GroupPrismaAdapter,
    }),
    ...multiProvide({
      provide: [
        LOAD_MEMBER_PORT,
        CREATE_MEMBER_PORT,
        UPDATE_MEMBER_PORT,
        DELETE_MEMBER_PORT,
      ],
      useClass: MemberPrismaAdapter,
    }),
    {
      provide: GET_GROUP_QUERY,
      useClass: GetGroupService,
    },
    {
      provide: MANAGE_GROUP_USECASE,
      useClass: ManageGroupService,
    },
    {
      provide: MANAGE_MEMBER_USECASE,
      useClass: ManageMemberService,
    },
  ],
})
export class GroupModule {}
