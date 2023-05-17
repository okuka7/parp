import { ChangeMaxLimitCommand } from './command/change.max-limit.command';
import { ChangeSaleScheduleCommand } from './command/change.sale-schedule.command';
import { OpenSaleCommand } from './command/open.sale.command';
import { RebalanceLimitCommand } from './command/rebalance.limit.command';

export const MANAGE_SALE_USECASE = Symbol('MANAGE_SALE_USECASE');

export interface ManageSaleUsecase {
  openSale(command: OpenSaleCommand): Promise<void>;
  rebalanceLimit(command: RebalanceLimitCommand): Promise<void>;
  changeMaxLimit(command: ChangeMaxLimitCommand): Promise<void>;
  changeSaleSchedule(command: ChangeSaleScheduleCommand): Promise<void>;
}
