import { User } from 'src/user/domain/user';

export interface UserLoadPersistencePort {
  loadUserById(id: string): Promise<User>;
  loadUserByEmail(email: string): Promise<User>;
}
