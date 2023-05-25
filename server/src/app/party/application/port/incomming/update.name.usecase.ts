import { UpdateNameCommand } from './command/update.name.command';

export const UPDATE_NAME_USECASE = Symbol('UPDATE_NAME_USECASE');

export interface UpdateNameUseCase {
  updateName(command: UpdateNameCommand): Promise<void>;
}
