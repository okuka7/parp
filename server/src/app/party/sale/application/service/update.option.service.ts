import { Money } from '@common/value';
import { ChangeOptionNameCommand } from '../port/incoming/command/change.option-name.command';
import { ChangePriceCommand } from '../port/incoming/command/change.price.command';
import { UpdateOptionUseCase } from '../port/incoming/update.option.usecase';
import { LoadPartyOptionPort } from '../port/outgoing/load.party-option.port';
import { UpdateOptionPort } from '../port/outgoing/update.option.port';

export class UpdateOptionService implements UpdateOptionUseCase {
  constructor(
    private readonly loadOptionPort: LoadPartyOptionPort,
    private readonly updateOptionPort: UpdateOptionPort,
  ) {}

  async updateOptionName(command: ChangeOptionNameCommand): Promise<void> {
    const optoin = await this.loadOptionPort.getOption(
      command.partyId,
      command.optionId,
    );

    optoin.updateName(command.name);

    await this.updateOptionPort.updateOption(optoin);
  }

  async changePrice(command: ChangePriceCommand): Promise<void> {
    if (command.price.cheaperThan(new Money(1000, 'KRW')))
      throw new Error('Invalid price');

    const option = await this.loadOptionPort.getOption(
      command.partyId,
      command.optionId,
    );

    option.changePrice(command.price);

    await this.updateOptionPort.updateOption(option);
  }
}
