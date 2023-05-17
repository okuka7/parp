import { Party } from '../../../domain/party';

export const CREATE_PARTY_PORT = Symbol('CREATE_PARTY_PORT');

export interface CreatePartyPort {
  createParty(party: Party): Promise<boolean>;
}
