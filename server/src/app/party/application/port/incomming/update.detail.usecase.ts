import { UpdateDetailCommand } from './command/update.detail.command';

export const UPDATE_DETAIL_USE_CASE = Symbol('UPDATE_DETAIL_USE_CASE');

export interface UpdateDetailUseCase {
  updateDetail(command: UpdateDetailCommand): Promise<void>;
}
