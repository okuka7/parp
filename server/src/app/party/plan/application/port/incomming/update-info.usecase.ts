import { ChangeDateCommand } from './command/change-date.command';
import { ChangeLocationCommand } from './command/change-location.command';
import { UpdateDescriptionCommand } from './command/update-description.command';
import { UpdateNameCommand } from './command/update-name.command';
import { UpdateNotesCommand } from './command/update-notes.command';

export const UPDATE_INFO_USE_CASE = Symbol('UPDATE_INFO_USE_CASE');

export interface UpdateInfoUseCase {
  updateName(command: UpdateNameCommand): Promise<void>;
  updateDescription(command: UpdateDescriptionCommand): Promise<void>;
  updateNotes(command: UpdateNotesCommand): Promise<void>;
  changeLocation(command: ChangeLocationCommand): Promise<void>;
  changeDate(command: ChangeDateCommand): Promise<void>;
}
