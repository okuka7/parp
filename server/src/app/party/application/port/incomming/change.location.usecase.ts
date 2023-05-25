import { ChangeLocationCommand } from './command/change.location.command';

export const CHANGE_LOCATION_USECASE = Symbol('CHANGE_LOCATION_USECASE');

export interface ChangeLocationUseCase {
  changeLocation(command: ChangeLocationCommand): Promise<void>;
}
