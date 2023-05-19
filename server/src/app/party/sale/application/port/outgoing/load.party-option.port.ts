import { PartyOption } from '../../../domain/option';

export const LOAD_PARTY_OPTION_PORT = Symbol('LOAD_PARTY_OPTION_PORT');

export interface LoadPartyOptionPort {
  getOption(partyId: string, optionId: number): Promise<PartyOption>;
  getManyOptions(partyId: string, optionIds: number[]): Promise<PartyOption[]>;
  countOption(partyId: string): Promise<number>;
}
