import { PartyOption } from '../../../domain/option';
import { Party } from '../../../domain/party';

export const UPDATE_OPTION_PORT = Symbol('UPDATE_OPTION_PORT');

export interface UpdateOptionPort {
  updateParty(party: Party): Promise<void>;
  updateOption(option: PartyOption): Promise<void>;
}
