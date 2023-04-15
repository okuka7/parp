import { User } from 'src/user/domain/user';

export interface UpdateUserPort {
  update(user: User): Promise<void>;
}
