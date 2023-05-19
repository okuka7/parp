import { PartyInfo } from '@root/app/party/plan/domain/info';
import { PartyOption } from '../../../domain/option';

export const UPDATE_OPTION_PORT = Symbol('UPDATE_OPTION_PORT');

export interface UpdateOptionPort {
  updateParty(party: PartyInfo): Promise<void>;
  updateOption(option: PartyOption): Promise<void>;
}
