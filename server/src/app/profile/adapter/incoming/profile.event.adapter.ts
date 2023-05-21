import { Controller, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
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
  handleUserRegisteredEvent(event: any) {
    this.createProfileUseCase.createProfile({
      userId: event.userId,
      name: event.name,
    });
  }
}
