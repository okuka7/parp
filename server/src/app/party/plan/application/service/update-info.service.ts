import { ChangeDateCommand } from '../port/incomming/command/change-date.command';
import { ChangeLocationCommand } from '../port/incomming/command/change-location.command';
import { UpdateDescriptionCommand } from '../port/incomming/command/update-description.command';
import { UpdateNameCommand } from '../port/incomming/command/update-name.command';
import { UpdateNotesCommand } from '../port/incomming/command/update-notes.command';
import { UpdateInfoUseCase } from '../port/incomming/update-info.usecase';
import { LoadPartyInfoPort } from '../port/outgoing/load.party-info.port';
import { UpdatePartyInfoPort } from '../port/outgoing/update.party-info.port';

export class UpdateInfoService implements UpdateInfoUseCase {
  constructor(
    private readonly loadPartyPort: LoadPartyInfoPort,
    private readonly updatePartyPort: UpdatePartyInfoPort,
  ) {}

  async updateName(command: UpdateNameCommand): Promise<void> {
    const party = await this.loadPartyPort.getPartyById(command.partyId);

    party.updateName(command.name);
    await this.updatePartyPort.updateParty(party);
  }

  async updateDescription(command: UpdateDescriptionCommand): Promise<void> {
    const party = await this.loadPartyPort.getPartyById(command.partyId);

    party.updateDescription(command.description);
    await this.updatePartyPort.updateParty(party);
  }

  async updateNotes(command: UpdateNotesCommand): Promise<void> {
    const party = await this.loadPartyPort.getPartyById(command.partyId);

    party.updateNotes(command.notes);
    await this.updatePartyPort.updateParty(party);
  }

  async changeLocation(command: ChangeLocationCommand): Promise<void> {
    const party = await this.loadPartyPort.getPartyById(command.partyId);

    party.changeLocation(command.location);
    await this.updatePartyPort.updateParty(party);
  }

  async changeDate(command: ChangeDateCommand): Promise<void> {
    const party = await this.loadPartyPort.getPartyById(command.partyId);

    party.changeDate(command.date);
    await this.updatePartyPort.updateParty(party);
  }
}
