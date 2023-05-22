import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { CreateProfilePort } from '../../application/port/outgoing/create-profile.port';
import { LoadProfilePort } from '../../application/port/outgoing/load.profile.port';
import { UpdateProfilePort } from '../../application/port/outgoing/update.profile.port';
import { Profile } from '../../domain/profile';

export class ProfilePersistenceAdapter
  implements LoadProfilePort, UpdateProfilePort, CreateProfilePort
{
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: EntityRepository<Profile>,
  ) {}

  async createProfile(profile: Profile): Promise<void> {
    this.profileRepository.create(profile);
  }

  async findProfileById(id: string): Promise<Profile | null> {
    return await this.profileRepository.findOne({ userId: id });
  }

  async update(user: Profile): Promise<void> {
    await this.profileRepository.upsert(user);
  }
}
