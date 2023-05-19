import { Money } from '@common/value';
import { Inject } from '@nestjs/common';
import { ChangeOptionNameCommand } from '../port/incoming/command/change.option-name.command';
import { ChangePriceCommand } from '../port/incoming/command/change.price.command';
import { RebalanceLimitCommand } from '../port/incoming/command/rebalance.limit.command';
import { UpdateOptionUseCase } from '../port/incoming/update.option.usecase';
import {
  LoadPartyOptionPort,
  LOAD_PARTY_OPTION_PORT,
} from '../port/outgoing/load.party-option.port';
import {
  UpdateOptionPort,
  UPDATE_OPTION_PORT,
} from '../port/outgoing/update.option.port';

export class UpdateOptionService implements UpdateOptionUseCase {
  constructor(
    @Inject(LOAD_PARTY_OPTION_PORT)
    private readonly loadOptionPort: LoadPartyOptionPort,
    @Inject(UPDATE_OPTION_PORT)
    private readonly updateOptionPort: UpdateOptionPort,
  ) {}

  async updateOptionName(command: ChangeOptionNameCommand): Promise<void> {
    const optoin = await this.loadOptionPort.getOption(
      command.partyId,
      command.optionId,
    );

    optoin.name = command.name;

    await this.updateOptionPort.updateOption(optoin);
  }

  async changePrice(command: ChangePriceCommand): Promise<void> {
    if (command.price.cheaperThan(new Money(1000, 'KRW')))
      throw new Error('Invalid price');

    const option = await this.loadOptionPort.getOption(
      command.partyId,
      command.optionId,
    );

    option.price = command.price;

    await this.updateOptionPort.updateOption(option);
  }

  async rebalanceLimit(command: RebalanceLimitCommand): Promise<void> {
    const options = await this.loadOptionPort.getManyOptions(
      command.partyId,
      command.options.map((option) => option.optionId),
    );

    if (options.length !== command.options.length)
      throw new Error('Invalid option');

    command.options.sort((a, b) => a.optionId - b.optionId);

    options.sort((a, b) => {
      return a.id - b.id;
    });

    options.forEach((option, index) => {
      option.maxCount = command.options[index].limit;
    });
  }
}
