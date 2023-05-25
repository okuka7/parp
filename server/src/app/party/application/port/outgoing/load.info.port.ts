import { PartyInfo } from '@root/app/party/domain/info';

export const LOAD_INFO_PORT = Symbol('LOAD_INFO_PORT');

export interface LoadInfoPort {
  findById(id: string): Promise<PartyInfo>;
  findByPartyId(partyId: string): Promise<PartyInfo>;
}
