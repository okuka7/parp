import { PartyInfo } from '../../../domain/info';
import { Party } from '../../../../party';

export const CREATE_PARTY_PORT = Symbol('CREATE_PARTY_PORT');

export interface CreatePartyPort {
  createParty(groupId: string): Promise<Party>;
  createPartyInfo(partyInfo: PartyInfo): Promise<boolean>;
}
