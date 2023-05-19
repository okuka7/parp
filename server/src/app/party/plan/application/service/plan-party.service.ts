import { ZonedDateTime } from '@js-joda/core';
import { Inject } from '@nestjs/common';
import { PartyInfo } from '../../domain/info';
import { PlanPartyCommand } from '../port/incomming/command/plan-party.command';
import { PlanPartyUseCase } from '../port/incomming/plan-party.usecase';
import {
  CreatePartyPort,
  CREATE_PARTY_PORT,
} from '../port/outgoing/create.party.port';

export class PlanPartyService implements PlanPartyUseCase {
  constructor(
    @Inject(CREATE_PARTY_PORT)
    private readonly createPartyPort: CreatePartyPort,
  ) {}

  async planParty(command: PlanPartyCommand): Promise<boolean> {
    if (!this.isOpenAfterTomorrow(command.date)) {
      throw new Error('Party must be open after tomorrow');
    }

    if (!this.isOpenBeforeNextYear(command.date)) {
      throw new Error('Party must be open before next year');
    }

    const party = await this.createPartyPort.createParty(command.groupId);

    const partyInfo = PartyInfo.create(
      party,
      command.name,
      command.description,
      command.notes,
      command.location,
      command.date,
    );

    return this.createPartyPort.createPartyInfo(partyInfo);
  }

  private isOpenAfterTomorrow(date: ZonedDateTime): boolean {
    return date.isAfter(ZonedDateTime.now().plusDays(1));
  }

  private isOpenBeforeNextYear(date: ZonedDateTime): boolean {
    return date.isBefore(ZonedDateTime.now().plusYears(1));
  }
}
