import { SaleInfo } from '../../../domain/sale-info';

export const UPDATE_SALE_INFO_PORT = Symbol('UPDATE_SALE_INFO_PORT');

export interface UpdateSaleInfoPort {
  updateSaleInfo(party: SaleInfo): Promise<void>;
}
