import { OpenSaleCommand } from './command/open.sale.command';

export const OPEN_SALE_USECASE = Symbol('OPEN_SALE_USECASE');

export interface OpenSaleUseCase {
  openSale(command: OpenSaleCommand): Promise<void>;
}
