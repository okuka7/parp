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

  async updateOptionName({
    partyId,
    optionNo,
    name,
  }: ChangeOptionNameCommand): Promise<void> {
    await this.loadSaleInfoPort
      .getSaleInfoWithOption(partyId)
      .then((saleInfo) => {
        saleInfo.changeOptionName(optionNo, name);
      });
  }

  async changePrice({
    partyId,
    optionNo,
    price,
  }: ChangePriceCommand): Promise<void> {
    await this.loadSaleInfoPort
      .getSaleInfoWithOption(partyId)
      .then((saleInfo) => {
        saleInfo.changeOptionPrice(optionNo, price);
      });
  }

  async rebalanceLimit({
    partyId,
    options,
  }: RebalanceLimitCommand): Promise<void> {
    await this.loadSaleInfoPort
      .getSaleInfoWithoutOption(partyId)
      .then((saleInfo) => saleInfo.rebalance(options));
  }
}
