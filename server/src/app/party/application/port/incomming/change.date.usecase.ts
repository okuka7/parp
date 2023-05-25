import { ChangeDateCommand } from './command/change.date.command';

export const CHANGE_DATE_USECASE = Symbol('CHANGE_DATE_USECASE');

export interface ChangeDateUseCase {
  changeDate(command: ChangeDateCommand): Promise<void>;
}
