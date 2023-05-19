import { Money } from '@common/value';
import { Inject } from '@nestjs/common';
import { PartyOption } from '../../domain/option';
import { AddOptionUsecase } from '../port/incoming/add.option.usecase';
import { AddOptionCommand } from '../port/incoming/command/add.option.command';
import {
  CreateOptionPort,
  CREATE_OPTION_PORT,
} from '../port/outgoing/create.option.port';
import {
  LoadSaleInfoPort,
  LOAD_SALE_INFO_PORT,
} from '../port/outgoing/load.sale-info.port';

export class AddOptionService implements AddOptionUsecase {
  constructor(
    @Inject(LOAD_SALE_INFO_PORT)
    private readonly loadSaleInfoPort: LoadSaleInfoPort,
    @Inject(CREATE_OPTION_PORT)
    private readonly createOptionPort: CreateOptionPort,
  ) {}

  async addOption(command: AddOptionCommand): Promise<void> {
    const party = await this.loadSaleInfoPort.getSaleInfoWithOption(
      command.partyId,
    );

    command.options.map(this.validateOption).forEach(party.addOption);

    await Promise.all(
      party.options.map((option) => this.createOptionPort.createOption(option)),
    );
  }

  private validateOption(option: {
    name: string;
    price: Money;
    maxCount: number;
  }): PartyOption {
    if (option.price.value < 1000) {
      throw new Error('Price must be greater than 1000');
    }
    return PartyOption.create(option.name, option.price, option.maxCount);
  }
}
