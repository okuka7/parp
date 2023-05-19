import { Profile } from '@root/app/profile/domain/profile';

export const GET_PROFILE_QUERY = Symbol('GET_PROFILE_QUERY');

export interface GetProfileQuery {
  getUserById(id: string): Promise<Profile>;
}
