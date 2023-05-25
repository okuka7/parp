import { Inject } from '@nestjs/common';
import { ChangeSaleScheduleCommand } from '../port/incoming/command/change.sale-schedule.command';
import { ManageSaleUsecase } from '../port/incoming/manage.sale.usecase';
import {
  LoadPartyPort,
  LOAD_PARTY_PORT,
} from '../port/outgoing/load.party-info.port';
import {
  LoadSaleInfoPort,
  LOAD_SALE_INFO_PORT,
} from '../port/outgoing/load.sale-info.port';

export class ManageSaleService implements ManageSaleUsecase {
  constructor(
    @Inject(LOAD_PARTY_PORT)
    private readonly loadPartyPort: LoadPartyPort,
    @Inject(LOAD_SALE_INFO_PORT)
    private readonly loadSaleInfoPort: LoadSaleInfoPort,
  ) {}

  async changeSaleSchedule(command: ChangeSaleScheduleCommand): Promise<void> {
    const partyDate = await this.loadPartyPort.getDateById(command.partyId);

    if (command.startSaleAt.isAfter(partyDate)) {
      throw new Error('Invalid date');
    }

    const saleInfo = await this.loadSaleInfoPort.getSaleInfoWithoutOption(
      command.partyId,
    );

    saleInfo.saleStartAt = command.startSaleAt;
  }
}
