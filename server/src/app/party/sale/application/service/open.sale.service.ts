import { Inject } from '@nestjs/common';
import { SaleInfo } from '../../domain/sale-info';
import { OpenSaleCommand } from '../port/incoming/command/open.sale.command';
import { OpenSaleUseCase } from '../port/incoming/open.sale.usecase';
import {
  CreateSaleInfoPort,
  CREATE_SALE_INFO_PORT,
} from '../port/outgoing/create.sale-info.port';
import {
  LoadPartyInfoPort,
  LOAD_PARTY_INFO_PORT,
} from '../port/outgoing/load.party-info.port';

export class OpenSaleService implements OpenSaleUseCase {
  constructor(
    @Inject(LOAD_PARTY_INFO_PORT)
    private readonly loadPartyInfoPort: LoadPartyInfoPort,
    @Inject(CREATE_SALE_INFO_PORT)
    private readonly createSaleInfoPort: CreateSaleInfoPort,
  ) {}
  async openSale(command: OpenSaleCommand): Promise<void> {
    const partyInfo = await this.loadPartyInfoPort.getPartyById(
      command.partyId,
    );

    if (partyInfo.date.isBefore(command.startSaleAt)) {
      throw new Error('Invalid date');
    }

    const saleInfo = new SaleInfo();

    saleInfo.partyId = partyInfo.partyId;
    saleInfo.ticketLimit = command.ticketLimit;
    saleInfo.saleStart = command.startSaleAt;

    await this.createSaleInfoPort.createSaleInfo(saleInfo);
  }
}
