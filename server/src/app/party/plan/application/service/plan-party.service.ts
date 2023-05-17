import { ZonedDateTime } from '@js-joda/core';
import { PartyInfo } from '@root/party/domain/info';
import { Party } from '@root/party/domain/party';
import { v4 as uuidv4 } from 'uuid';
import { PlanPartyCommand } from '../port/incoming/command/plan-party.command';
import { PlanPartyUseCase } from '../port/incoming/plan-party.usecase';
import { CreatePartyPort } from '../port/outgoing/create-party.port';

export class PlanPartyService implements PlanPartyUseCase {
  constructor(private readonly createPartyPort: CreatePartyPort) {}

  planParty(command: PlanPartyCommand): Promise<boolean> {
    const partyInfo = new PartyInfo(
      command.description,
      command.notes,
      command.address,
      command.date,
    );

    const party = new Party(
      uuidv4(),
      command.name,
      partyInfo,
      command.tiketLimit,
      command.startSaleAt,
    );

    if (!this.isOpenAfterSale(party)) {
      throw new Error('Party must be open after sale');
    }

    if (party.isForSale() && !this.isOpenAfterTomorrow(party)) {
      throw new Error('Party must be open after tomorrow');
    }

    if (party.isForSale() && !this.isSaleAfterOneHour(party)) {
      throw new Error('Party must be open after one hour');
    }

    return this.createPartyPort.createParty(party);
  }

  private isOpenAfterTomorrow(party: Party): boolean {
    return party.date.isAfter(ZonedDateTime.now().plusDays(1));
  }

  private isOpenAfterSale(party: Party): boolean {
    return !!party.startSaleAt && party.date.isAfter(party.startSaleAt);
  }

  private isSaleAfterOneHour(party: Party): boolean {
    return (
      !!party.startSaleAt &&
      party.startSaleAt.isAfter(ZonedDateTime.now().plusHours(1))
    );
  }
}
