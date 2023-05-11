import { Injectable } from '@nestjs/common';
import { MemberRole } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateMemberPort } from 'src/group/application/port/outgoing/create-member.port';
import { DeleteMemberPort } from 'src/group/application/port/outgoing/delete-member.port';
import { LoadMemberPort } from 'src/group/application/port/outgoing/load-member.port';
import { UpdateMemberPort } from 'src/group/application/port/outgoing/update-member.port';
import { Member } from 'src/group/domain/member';
import { DatabaseException } from 'src/lib/exception/database.exception';

@Injectable()
export class MemberPrismaAdapter
  implements
    CreateMemberPort,
    UpdateMemberPort,
    LoadMemberPort,
    DeleteMemberPort
{
  constructor(private readonly prisma: PrismaService) {}

  public async findMember(groupId: string, memberId: string): Promise<Member> {
    const member = await this.prisma.member.findUnique({
      where: {
        userId_groupId: {
          groupId,
          userId: memberId,
        },
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!member) throw DatabaseException.NotFound();
    return new Member({
      id: member.userId,
      name: member.user.name,
      role: member.role as MemberRole,
    });
  }

  public async findAllMember(groupId: string): Promise<Member[]> {
    const members = await this.prisma.member.findMany({
      where: {
        groupId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return members.map(
      (member) =>
        new Member({
          id: member.userId,
          name: member.user.name,
          role: member.role as MemberRole,
        }),
    );
  }

  public async createMember(groupId: string, memberId: string): Promise<void> {
    try {
      await this.prisma.member.create({
        data: {
          groupId,
          userId: memberId,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw DatabaseException.Prisma(error);
      } else {
        throw error;
      }
    }
  }

  public async createManyMember(
    groupId: string,
    memberIds: string[],
  ): Promise<void> {
    try {
      await this.prisma.member.createMany({
        data: memberIds.map((memberId) => ({
          groupId,
          userId: memberId,
          role: 'MEMBER',
        })),
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw DatabaseException.Prisma(error);
      } else {
        throw error;
      }
    }
  }

  public async updateMember(groupId: string, member: Member): Promise<void> {
    try {
      await this.prisma.member.update({
        where: {
          userId_groupId: {
            groupId,
            userId: member.getId(),
          },
        },
        data: {
          role: member.getRole(),
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw DatabaseException.Prisma(error);
      } else {
        throw error;
      }
    }
  }

  public async deleteMember(groupId: string, memberId: string): Promise<void> {
    try {
      await this.prisma.member.delete({
        where: {
          userId_groupId: {
            groupId,
            userId: memberId,
          },
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw DatabaseException.Prisma(error);
      } else {
        throw error;
      }
    }
  }
}
