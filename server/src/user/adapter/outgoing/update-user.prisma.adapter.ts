import { PrismaService } from 'src/common/prisma/prisma.service';
import { UpdateUserPort } from 'src/user/application/port/outgoing/update-user.port';
import { User } from 'src/user/domain/user';

export class UpdateUserPrismaAdapter
  extends PrismaService
  implements UpdateUserPort
{
  async update(user: User): Promise<void> {
    const { name, phoneNumber, password } = user.toPersistence();
    await this.prisma.user.update({
      where: {
        id: user.getId(),
      },
      data: {
        name,
        phoneNumber,
        password,
      },
    });
  }
}
