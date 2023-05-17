import { PartyOption } from '../../../domain/option';
import { Party } from '../../../domain/party';

export const LOAD_PARTY_OPTION_PORT = Symbol('LOAD_PARTY_OPTION_PORT');

export interface LoadPartyOptionPort {
  getPartyWithOption(partyId: string): Promise<Party>;
  getPartyWithoutOption(partyId: string): Promise<Party>;
  getOption(partyId: string, optionId: number): Promise<PartyOption>;
  countOption(partyId: string): Promise<number>;
}
