import { AddOptionCommand } from './command/add.option.command';

export const ADD_OPTION_USECASE = Symbol('ADD_OPTION_USECASE');

export interface AddOptionUsecase {
  addOption(command: AddOptionCommand): Promise<void>;
}
