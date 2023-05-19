import { Profile } from '../../../domain/profile';

export const CREATE_PROFILE_PORT = Symbol('CREATE_PROFILE_PORT');

export interface CreateProfilePort {
  createProfile(profile: Profile): Promise<void>;
}
