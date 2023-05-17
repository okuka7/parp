import { ChangeMaxLimitCommand } from '../port/incoming/command/change.max-limit.command';
import { ChangeSaleScheduleCommand } from '../port/incoming/command/change.sale-schedule.command';
import { OpenSaleCommand } from '../port/incoming/command/open.sale.command';
import { RebalanceLimitCommand } from '../port/incoming/command/rebalance.limit.command';
import { ManageSaleUsecase } from '../port/incoming/manage.sale.usecase';
import { LoadPartyOptionPort } from '../port/outgoing/load.party-option.port';
import { UpdateOptionPort } from '../port/outgoing/update.option.port';

export class ManageSaleService implements ManageSaleUsecase {
  constructor(
    private readonly loadPartyOptionPort: LoadPartyOptionPort,
    private readonly updatePartyOptionPort: UpdateOptionPort,
  ) {}

  async openSale(command: OpenSaleCommand): Promise<void> {
    const party = await this.loadPartyOptionPort.getPartyWithoutOption(
      command.partyId,
    );

    party.openSale(command.ticketLimit, command.startSaleAt);

    await this.updatePartyOptionPort.updateParty(party);
  }

  async changeMaxLimit(command: ChangeMaxLimitCommand): Promise<void> {
    const party = await this.loadPartyOptionPort.getPartyWithoutOption(
      command.partyId,
    );

    party.changeTicketLimit(command.maxLimit);

    await this.updatePartyOptionPort.updateParty(party);
  }

  async changeSaleSchedule(command: ChangeSaleScheduleCommand): Promise<void> {
    const party = await this.loadPartyOptionPort.getPartyWithoutOption(
      command.partyId,
    );

    if (command.startSaleAt.isAfter(party.date)) {
      throw new Error('Invalid date');
    }

    party.changeStartSaleAt(command.startSaleAt);

    await this.updatePartyOptionPort.updateParty(party);
  }

  async rebalanceLimit(command: RebalanceLimitCommand): Promise<void> {
    const party = await this.loadPartyOptionPort.getPartyWithOption(
      command.partyId,
    );

    party.options
      .find((option) => option.id === command.optionId)
      ?.rebalance(command.limit);

    const limitSum = party.options
      .filter((option) => option.id > 0)
      .reduce((sum, option) => sum + option.maxCount, 0);

    if (party.ticketLimit && party.ticketLimit < limitSum) {
      throw new Error('Invalid limit');
    }

    await this.updatePartyOptionPort.updateParty(party);
  }
}
