import { Inject } from '@nestjs/common';
import { Policy } from '../../domain/policy';
import { AddOptionUsecase } from '../port/incoming/add.option.usecase';
import { AddOptionCommand } from '../port/incoming/command/add.option.command';
import {
  LoadSaleInfoPort,
  LOAD_SALE_INFO_PORT,
} from '../port/outgoing/load.sale-info.port';

export class AddOptionService implements AddOptionUsecase {
  constructor(
    @Inject(LOAD_SALE_INFO_PORT)
    private readonly loadSaleInfoPort: LoadSaleInfoPort,
  ) {}

  async addOption({ partyId, options }: AddOptionCommand): Promise<void> {
    const party = await this.loadSaleInfoPort.getSaleInfoWithOption(partyId);
    const policy = new Policy();
    options.forEach(({ name, price, maxCount }) =>
      party.addOption({
        name,
        price,
        policy,
        maxCount,
      }),
    );
  }
}
