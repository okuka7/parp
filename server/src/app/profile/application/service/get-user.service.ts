import { Profile } from '../../domain/profile';
import { GetProfileQuery } from '../port/incoming/get-user.query';
import { LoadProfilePort } from '../port/outgoing/load.profile.port';

export class GetProfileService implements GetProfileQuery {
  constructor(private readonly loadProfilePort: LoadProfilePort) {}

  async getUserById(id: string): Promise<Profile> {
    const profile = await this.loadProfilePort.findProfileById(id);
    if (!profile) {
      throw new Error('User not found');
    }
    return profile;
  }
}
