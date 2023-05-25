import { Inject } from '@nestjs/common';
import { CancelPartyUseCase } from '../port/incomming/cancel.party.usecase';
import { CancelPartyCommand } from '../port/incomming/command/cancel.party.command';
import {
  CheckTicketPort,
  CHECK_TICKET_PORT,
} from '../port/outgoing/check.ticket.port';
import { LoadInfoPort, LOAD_INFO_PORT } from '../port/outgoing/load.info.port';

export class CancelPartyService implements CancelPartyUseCase {
  constructor(
    @Inject(LOAD_INFO_PORT) private readonly loadInfoPort: LoadInfoPort,
    @Inject(CHECK_TICKET_PORT)
    private readonly checkTicketPort: CheckTicketPort,
  ) {}

  async cancelParty({ partyId }: CancelPartyCommand): Promise<void> {
    if (await this.checkTicketPort.hasPaidTicket(partyId))
      throw new Error('Cannot cancel party with paid tickets');
    await this.loadInfoPort.findByPartyId(partyId).then((info) => {
      info.cancelParty(partyId);
    });
  }
}
