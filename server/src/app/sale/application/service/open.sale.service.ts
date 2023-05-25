import { Inject } from '@nestjs/common';
import { SaleInfo } from '../../domain/sale-info';
import { OpenSaleCommand } from '../port/incoming/command/open.sale.command';
import { OpenSaleUseCase } from '../port/incoming/open.sale.usecase';
import {
  CreateSaleInfoPort,
  CREATE_SALE_INFO_PORT,
} from '../port/outgoing/create.sale-info.port';
import {
  LoadPartyPort,
  LOAD_PARTY_PORT,
} from '../port/outgoing/load.party-info.port';

export class OpenSaleService implements OpenSaleUseCase {
  constructor(
    @Inject(LOAD_PARTY_PORT)
    private readonly loadPartyInfoPort: LoadPartyPort,
    @Inject(CREATE_SALE_INFO_PORT)
    private readonly createSaleInfoPort: CreateSaleInfoPort,
  ) {}
  async openSale({ partyId, startSaleAt }: OpenSaleCommand): Promise<void> {
    const partyDate = await this.loadPartyInfoPort.getDateById(partyId);

    if (partyDate.isBefore(startSaleAt)) {
      throw new Error('Invalid date');
    }

    await this.createSaleInfoPort.createSaleInfo(
      new SaleInfo(partyId, startSaleAt),
    );
  }
}
