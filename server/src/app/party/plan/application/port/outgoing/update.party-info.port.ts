import { PartyInfo } from '../../../domain/info';

export const UPDATE_PARTY_INFO_PORT = Symbol('UPDATE_PARTY_INFO_PORT');

export interface UpdatePartyInfoPort {
  updatePartyInfo(party: PartyInfo): Promise<void>;
}
