import { Inject } from '@nestjs/common';
import { ChangeDateCommand } from '../port/incomming/command/change-date.command';
import { ChangeLocationCommand } from '../port/incomming/command/change-location.command';
import { UpdateDescriptionCommand } from '../port/incomming/command/update-description.command';
import { UpdateNameCommand } from '../port/incomming/command/update-name.command';
import { UpdateNotesCommand } from '../port/incomming/command/update-notes.command';
import { UpdateInfoUseCase } from '../port/incomming/update-info.usecase';
import {
  LoadPartyInfoPort,
  LOAD_PARTY_INFO_PORT,
} from '../port/outgoing/load.party-info.port';
import {
  UpdatePartyInfoPort,
  UPDATE_PARTY_INFO_PORT,
} from '../port/outgoing/update.party-info.port';

export class UpdateInfoService implements UpdateInfoUseCase {
  constructor(
    @Inject(LOAD_PARTY_INFO_PORT)
    private readonly loadPartyPort: LoadPartyInfoPort,

    @Inject(UPDATE_PARTY_INFO_PORT)
    private readonly updatePartyPort: UpdatePartyInfoPort,
  ) {}

  async updateName(command: UpdateNameCommand): Promise<void> {
    const party = await this.loadPartyPort.getPartyById(command.partyId);

    party.name = command.name;

    await this.updatePartyPort.updatePartyInfo(party);
  }

  async updateDescription(command: UpdateDescriptionCommand): Promise<void> {
    const party = await this.loadPartyPort.getPartyById(command.partyId);

    party.description = command.description;
    await this.updatePartyPort.updatePartyInfo(party);
  }

  async updateNotes(command: UpdateNotesCommand): Promise<void> {
    const party = await this.loadPartyPort.getPartyById(command.partyId);

    party.notes = command.notes;
    await this.updatePartyPort.updatePartyInfo(party);
  }

  async changeLocation(command: ChangeLocationCommand): Promise<void> {
    const party = await this.loadPartyPort.getPartyById(command.partyId);

    party.location = command.location;
    await this.updatePartyPort.updatePartyInfo(party);
  }

  async changeDate(command: ChangeDateCommand): Promise<void> {
    const party = await this.loadPartyPort.getPartyById(command.partyId);

    party.date = command.date;
    await this.updatePartyPort.updatePartyInfo(party);
  }
}
