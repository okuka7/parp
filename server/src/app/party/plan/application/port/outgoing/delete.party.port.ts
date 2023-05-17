export const DELETE_PARTY_PORT = Symbol('DELETE_PARTY_PORT');

export interface DeletePartyPort {
  deleteParty(partyId: string): Promise<void>;
}
