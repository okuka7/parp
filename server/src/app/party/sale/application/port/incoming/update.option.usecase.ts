import { ChangeOptionNameCommand } from './command/change.option-name.command';
import { ChangePriceCommand } from './command/change.price.command';
import { RebalanceLimitCommand } from './command/rebalance.limit.command';

export const UDPATE_OPTION_USECASE = Symbol('UDPATE_OPTION_USECASE');

export interface UpdateOptionUseCase {
  updateOptionName(command: ChangeOptionNameCommand): Promise<void>;
  changePrice(command: ChangePriceCommand): Promise<void>;
  rebalanceLimit(command: RebalanceLimitCommand): Promise<void>;
}
