import { Inject, Logger } from '@nestjs/common';
import { Profile } from '../../domain/profile';
import { CreateProfileCommand } from '../port/incoming/command/create.profile.command';
import { CreateProfileUseCase } from '../port/incoming/create.profile.usecase';
import {
  CreateProfilePort,
  CREATE_PROFILE_PORT,
} from '../port/outgoing/create-profile.port';

export class CreateProfileService implements CreateProfileUseCase {
  constructor(
    @Inject(CREATE_PROFILE_PORT)
    private readonly createProfilePort: CreateProfilePort,
    private readonly logger: Logger,
  ) {}
  async createProfile(command: CreateProfileCommand): Promise<void> {
    const profile = Profile.create(command.user, command.name);
    this.createProfilePort.createProfile(profile).catch((error) => {
      this.logger.error(error);
    });
  }
}
