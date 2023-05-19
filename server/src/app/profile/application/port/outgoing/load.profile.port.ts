import { Profile } from '@root/app/profile/domain/profile';

export const LOAD_PROFILE_PORT = Symbol('LOAD_PROFILE_PORT');

export interface LoadProfilePort {
  findProfileById(id: string): Promise<Profile | null>;
}
