import { UserRegisteredEvent } from '@lib/event/user.registered.event';
import { Controller, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateProfileCommand } from '../../application/port/incoming/command/create.profile.command';
import {
  CreateProfileUseCase,
  CREATE_PROFILE_USECASE,
} from '../../application/port/incoming/create.profile.usecase';

@Controller()
export class ProfileEventAdapter {
  constructor(
    @Inject(CREATE_PROFILE_USECASE)
    private readonly createProfileUseCase: CreateProfileUseCase,
  ) {}

  @OnEvent('user.registered')
  handleUserRegisteredEvent(event: UserRegisteredEvent) {
    this.createProfileUseCase.createProfile(
      new CreateProfileCommand(event.userId, event.name),
    );
  }
}
