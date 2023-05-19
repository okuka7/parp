import { Profile } from '@root/app/profile/domain/profile';

export const UPDATE_PROFILE_PORT = Symbol('UPDATE_PROFILE_PORT');

export interface UpdateProfilePort {
  update(user: Profile): Promise<void>;
}
