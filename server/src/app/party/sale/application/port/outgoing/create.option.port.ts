import { PartyOption } from '../../../domain/option';

export const CREATE_OPTION_PORT = Symbol('CREATE_OPTION_PORT');

export interface CreateOptionPort {
  createOption(option: PartyOption): Promise<void>;
}
