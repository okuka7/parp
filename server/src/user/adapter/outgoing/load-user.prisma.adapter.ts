import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserLoadPersistencePort } from 'src/user/application/port/outgoing/load-user.port';
import { User } from 'src/user/domain/user';

export class LoadUserPrismaAdapter implements UserLoadPersistencePort {
  constructor(private readonly prisma: PrismaService) {}

  async loadUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return new User(
      user.id,
      user.email,
      user.name,
      user.phoneNumber,
      user.createdAt,
    );
  }

  async loadUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return new User(
      user.id,
      user.email,
      user.name,
      user.phoneNumber,
      user.createdAt,
    );
  }
}
