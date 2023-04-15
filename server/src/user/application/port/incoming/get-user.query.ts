import { User } from 'src/user/domain/user';

export interface GetUserService {
  getUserById(id: number): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
}
