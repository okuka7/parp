import { Party } from '../../../domain/party';

export const UPDATE_PARTY_INFO_PORT = Symbol('UPDATE_PARTY_INFO_PORT');

export interface UpdatePartyInfoPort {
  updateParty(party: Party): Promise<void>;
}
