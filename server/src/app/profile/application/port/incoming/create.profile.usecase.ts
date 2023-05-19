import { CreateProfileCommand } from './command/create.profile.command';

export const CREATE_PROFILE_USECASE = Symbol('CREATE_PROFILE_USECASE');

export interface CreateProfileUseCase {
  createProfile(command: CreateProfileCommand): Promise<void>;
}
