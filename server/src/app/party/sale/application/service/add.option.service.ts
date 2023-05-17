import { PartyOption } from '../../domain/option';
import { AddOptionUsecase } from '../port/incoming/add.option.usecase';
import { AddOptionCommand } from '../port/incoming/command/add.option.command';
import { CreateOptionPort } from '../port/outgoing/create.option.port';
import { LoadPartyOptionPort } from '../port/outgoing/load.party-option.port';

export class AddOptionService implements AddOptionUsecase {
  constructor(
    private readonly loadOptionPort: LoadPartyOptionPort,
    private readonly createOptionPort: CreateOptionPort,
  ) {}
  async addOption(command: AddOptionCommand): Promise<void> {
    if (command.price.value < 1000) {
      throw new Error('Price must be greater than 1000');
    }

    const optionId = await this.loadOptionPort.countOption(command.partyId);

    const option = new PartyOption(
      command.partyId,
      optionId,
      command.name,
      command.price,
      command.maxCount,
    );

    await this.createOptionPort.createOption(option);
  }
}
