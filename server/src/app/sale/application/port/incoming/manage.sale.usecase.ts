import { ChangeSaleScheduleCommand } from './command/change.sale-schedule.command';

export const MANAGE_SALE_USECASE = Symbol('MANAGE_SALE_USECASE');

export interface ManageSaleUsecase {
  changeSaleSchedule(command: ChangeSaleScheduleCommand): Promise<void>;
}
