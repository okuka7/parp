import { PartyInfo } from '@root/app/party/plan/domain/info';

export const LOAD_PARTY_INFO_PORT = Symbol('LOAD_PARTY_INFO_PORT');

export interface LoadPartyInfoPort {
  getPartyById(partyId: string): Promise<PartyInfo>;
}