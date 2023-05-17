import { Party } from '../../../domain/party';

export const LOAD_PARTY_INFO_PORT = Symbol('LOAD_PARTY_INFO_PORT');

export interface LoadPartyInfoPort {
  getPartyById(partyId: string): Promise<Party>;
}
