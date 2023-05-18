import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateGroupPort } from 'src/group/application/port/outgoing/create-group.port';
import { LoadGroupPort } from 'src/group/application/port/outgoing/load-group.port';
import { UpdateGroupPort } from 'src/group/application/port/outgoing/update-group.port';
import { Group } from 'src/group/domain/group';
import { Member } from 'src/group/domain/member';
import { DatabaseException } from 'src/lib/exception/database.exception';

export class GroupPrismaAdapter
  extends PrismaService
  implements LoadGroupPort, CreateGroupPort, UpdateGroupPort
{
  public async findGroup(id: string): Promise<Group> {
    const group = await this.prisma.group.findUnique({
      where: { id },
    });

    if (!group) {
      throw DatabaseException.NotFound('Group');
    }

    return new Group({
      id: group.id,
      name: group.name,
      member: [],
    });
  }

  public async findGroupWithMembers(id: string): Promise<Group> {
    const group = await this.prisma.group.findUnique({
      where: { id },
      include: {
        members: true,
      },
    });

    if (!group) {
      throw DatabaseException.NotFound('Group');
    }

    return new Group({
      id: group.id,
      name: group.name,
      member: group.members.map((member) => {
        return new Member({
          id: member.userId,
          role: member.role,
        });
      }),
    });
  }

  async createGroup(group: Group): Promise<void> {
    const owner = group.getMembers()[0];
    await this.prisma.group.create({
      data: {
        id: group.getId(),
        name: group.getName(),
        members: {
          create: {
            userId: owner.getId(),
            role: owner.getRole(),
          },
        },
      },
    });
  }

  public async updateGroup(group: Group): Promise<void> {
    await this.prisma.group.update({
      where: { id: group.getId() },
      data: {
        name: group.getName(),
        members: {
          upsert: group.getMembers().map((member) => ({
            where: {
              userId_groupId: {
                userId: member.getId(),
                groupId: group.getId(),
              },
            },
            create: {
              userId: member.getId(),
              role: member.getRole(),
            },
            update: {
              role: member.getRole(),
            },
          })),
        },
      },
    });
  }

  public async deleteGroup(id: string): Promise<void> {
    await this.prisma.group.update({
      where: { id },
      data: {
        isDeleted: new Date(),
      },
    });
  }
}
