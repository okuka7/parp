import { ZonedDateTime } from '@js-joda/core';

export const LOAD_PARTY_PORT = Symbol('LOAD_PARTY_PORT');

export interface LoadPartyPort {
  getDateById(partyId: string): Promise<ZonedDateTime>;
}
