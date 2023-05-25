import { Inject } from '@nestjs/common';
import { Detail } from '../../domain/detail';
import { PartyInfo } from '../../domain/info';
import { RegisterInfoCommand } from '../port/incomming/command/register.info.command';
import { UpdateDetailCommand } from '../port/incomming/command/update.detail.command';
import { UpdateNameCommand } from '../port/incomming/command/update.name.command';
import { RegisterInfoUsecase } from '../port/incomming/register.info.usecase';
import { UpdateDetailUseCase } from '../port/incomming/update.detail.usecase';
import { UpdateNameUseCase } from '../port/incomming/update.name.usecase';
import {
  CreateInfoPort,
  CREATE_INFO_PORT,
} from '../port/outgoing/create.info.port';
import {
  LoadCategoryPort,
  LOAD_CATEGORY_PORT,
} from '../port/outgoing/load.category.port';
import { LoadInfoPort, LOAD_INFO_PORT } from '../port/outgoing/load.info.port';

export class ManageInfoService
  implements RegisterInfoUsecase, UpdateNameUseCase, UpdateDetailUseCase
{
  constructor(
    @Inject(LOAD_INFO_PORT) private readonly loadInfoPort: LoadInfoPort,
    @Inject(LOAD_CATEGORY_PORT)
    private readonly loadCategoryPort: LoadCategoryPort,
    @Inject(CREATE_INFO_PORT) private readonly createInfoPort: CreateInfoPort,
  ) {}

  async registerPartyInfo(command: RegisterInfoCommand): Promise<void> {
    await this.loadCategoryPort
      .findByName(command.category)
      .then((category) => {
        return new PartyInfo(
          category,
          command.name,
          new Detail(command.description, command.notes),
        );
      })
      .then((info) => {
        this.createInfoPort.save(info);
      });
  }

  async updateName(command: UpdateNameCommand): Promise<void> {
    await this.loadInfoPort.findById(command.infoId).then((info) => {
      info.changeName(command.name);
    });
  }

  async updateDetail(command: UpdateDetailCommand): Promise<void> {
    await this.loadInfoPort.findById(command.infoId).then((info) => {
      info.changeDetail(new Detail(command.description, command.notes));
    });
  }
}
