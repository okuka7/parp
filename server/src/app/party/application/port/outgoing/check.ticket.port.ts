export const CHECK_TICKET_PORT = Symbol('CHECK_TICKET_PORT');

export interface CheckTicketPort {
  hasPaidTicket(partyId: string): Promise<boolean>;
}
