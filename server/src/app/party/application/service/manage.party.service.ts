import { Inject } from '@nestjs/common';
import { ChangeDateUseCase } from '../port/incomming/change.date.usecase';
import { ChangeLocationUseCase } from '../port/incomming/change.location.usecase';
import { ChangeDateCommand } from '../port/incomming/command/change.date.command';
import { ChangeLocationCommand } from '../port/incomming/command/change.location.command';
import { PlanPartyCommand } from '../port/incomming/command/plan.new-party.command';
import { PlanPartyUseCase } from '../port/incomming/plan.party.usecase';
import { LoadInfoPort, LOAD_INFO_PORT } from '../port/outgoing/load.info.port';

export class ManagePartyService
  implements PlanPartyUseCase, ChangeDateUseCase, ChangeLocationUseCase
{
  constructor(
    @Inject(LOAD_INFO_PORT) private readonly loadInfoPort: LoadInfoPort,
  ) {}
  async planParty(command: PlanPartyCommand): Promise<void> {
    const info = await this.loadInfoPort.findById(command.infoId);

    info.planNewParty(command.date, command.address);
  }

  async changeDate({ partyId, date }: ChangeDateCommand): Promise<void> {
    await this.loadInfoPort.findByPartyId(partyId).then((info) => {
      info.changePartyDate(partyId, date);
    });
  }

  async changeLocation(command: ChangeLocationCommand): Promise<void> {
    await this.loadInfoPort.findById(command.partyId).then((info) => {
      info.changePartyAddress(command.partyId, command.address);
    });
  }
}
