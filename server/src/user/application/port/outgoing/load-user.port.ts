import { User } from 'src/user/domain/user';

export interface UserLoadPersistencePort {
  loadUserById(id: number): Promise<User>;
  loadUserByEmail(email: string): Promise<User>;
}
