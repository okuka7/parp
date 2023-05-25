import { Inject } from '@nestjs/common';
import { ChangeOptionNameCommand } from '../port/incoming/command/change.option-name.command';
import { ChangePriceCommand } from '../port/incoming/command/change.price.command';
import { RebalanceLimitCommand } from '../port/incoming/command/rebalance.limit.command';
import { UpdateOptionUseCase } from '../port/incoming/update.option.usecase';
import {
  LoadSaleInfoPort,
  LOAD_SALE_INFO_PORT,
} from '../port/outgoing/load.sale-info.port';

export class UpdateOptionService implements UpdateOptionUseCase {
  constructor(
    @Inject(LOAD_SALE_INFO_PORT)
    private readonly loadSaleInfoPort: LoadSaleInfoPort,
  ) {}

  async updateOptionName(command: ChangeOptionNameCommand): Promise<void> {
    this.loadSaleInfoPort
      .getSaleInfoWithOption(command.partyId)
      .then((saleInfo) => {
        saleInfo.getOption(command.optionId).name = command.name;
      });
  }

  async changePrice(command: ChangePriceCommand): Promise<void> {
    this.loadSaleInfoPort
      .getSaleInfoWithOption(command.partyId)
      .then((saleInfo) => {
        saleInfo.getOption(command.optionId).changePrice(command.price);
      });
  }

  async rebalanceLimit(command: RebalanceLimitCommand): Promise<void> {
    const saleInfo = await this.loadSaleInfoPort.getSaleInfoWithoutOption(
      command.partyId,
    );
    saleInfo.rebalance(command.options);
  }
}
