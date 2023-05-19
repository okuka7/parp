import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { LoadProfilePort } from '../../application/port/outgoing/load.profile.port';
import { UpdateProfilePort } from '../../application/port/outgoing/update.profile.port';
import { Profile } from '../../domain/profile';

export class ProfilePersistenceAdapter
  implements LoadProfilePort, UpdateProfilePort
{
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: EntityRepository<Profile>,
  ) {}

  async findProfileById(id: string): Promise<Profile | null> {
    return await this.profileRepository.findOne({ user: id });
  }

  async update(user: Profile): Promise<void> {
    await this.profileRepository.upsert(user);
  }
}
