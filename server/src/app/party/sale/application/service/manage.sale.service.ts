import { Inject } from '@nestjs/common';
import { ChangeMaxLimitCommand } from '../port/incoming/command/change.max-limit.command';
import { ChangeSaleScheduleCommand } from '../port/incoming/command/change.sale-schedule.command';
import { RebalanceLimitCommand } from '../port/incoming/command/rebalance.limit.command';
import { ManageSaleUsecase } from '../port/incoming/manage.sale.usecase';
import {
  LoadPartyInfoPort,
  LOAD_PARTY_INFO_PORT,
} from '../port/outgoing/load.party-info.port';
import {
  LoadSaleInfoPort,
  LOAD_SALE_INFO_PORT,
} from '../port/outgoing/load.sale-info.port';
import {
  UpdateSaleInfoPort,
  UPDATE_SALE_INFO_PORT,
} from '../port/outgoing/update.sale-info.port';

export class ManageSaleService implements ManageSaleUsecase {
  constructor(
    @Inject(LOAD_PARTY_INFO_PORT)
    private readonly loadPartyInfoPort: LoadPartyInfoPort,
    @Inject(LOAD_SALE_INFO_PORT)
    private readonly loadSaleInfoPort: LoadSaleInfoPort,
    @Inject(UPDATE_SALE_INFO_PORT)
    private readonly updateSaleInfoPort: UpdateSaleInfoPort,
  ) {}

  async changeMaxLimit(command: ChangeMaxLimitCommand): Promise<void> {
    const saleInfo = await this.loadSaleInfoPort.getSaleInfoWithOption(
      command.partyId,
    );

    const limitSum = saleInfo
      .getAdditionalOptions()
      .reduce((sum, option) => sum + option.maxCount, 0);

    if (command.maxLimit < limitSum) {
      throw new Error('Invalid limit');
    }

    saleInfo.ticketLimit = command.maxLimit;
    saleInfo.getDefaultOption()?.rebalance(command.maxLimit);

    await this.updateSaleInfoPort.updateSaleInfo(saleInfo);
  }

  async changeSaleSchedule(command: ChangeSaleScheduleCommand): Promise<void> {
    const partyInfo = await this.loadPartyInfoPort.getPartyById(
      command.partyId,
    );

    if (command.startSaleAt.isAfter(partyInfo.date)) {
      throw new Error('Invalid date');
    }

    const saleInfo = await this.loadSaleInfoPort.getSaleInfoWithoutOption(
      command.partyId,
    );

    saleInfo.saleStart = command.startSaleAt;

    await this.updateSaleInfoPort.updateSaleInfo(saleInfo);
  }

  async rebalanceLimit(command: RebalanceLimitCommand): Promise<void> {
    if (!command.options.every((option) => option.optionId > 0))
      throw new Error('Invalid option');

    const saleInfo = await this.loadSaleInfoPort.getSaleInfoWithoutOption(
      command.partyId,
    );

    const limitSum = saleInfo
      .getAdditionalOptions()
      .reduce((sum, option) => sum + option.maxCount, 0);

    if (saleInfo.ticketLimit < limitSum) {
      throw new Error('Invalid limit');
    }

    await this.updateSaleInfoPort.updateSaleInfo(saleInfo);
  }
}
