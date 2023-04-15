import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { User } from 'src/user/domain/user';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserById(id: number): Promise<User> {
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
      user.role,
      user.createdAt,
    );
  }

  async createUser(
    email: string,
    password: string,
    name: string,
    phoneNumber: string,
  ) {
    return this.prisma.user.create({
      data: {
        email,
        password,
        name,
        phoneNumber,
      },
    });
  }
}
