import { ChangeMaxLimitCommand } from './command/change.max-limit.command';
import { ChangeSaleScheduleCommand } from './command/change.sale-schedule.command';

export const MANAGE_SALE_USECASE = Symbol('MANAGE_SALE_USECASE');

export interface ManageSaleUsecase {
  changeMaxLimit(command: ChangeMaxLimitCommand): Promise<void>;
  changeSaleSchedule(command: ChangeSaleScheduleCommand): Promise<void>;
}
