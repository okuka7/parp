import { SaleInfo } from '../../../domain/sale-info';

export const LOAD_SALE_INFO_PORT = Symbol('LOAD_SALE_INFO_PORT');

export interface LoadSaleInfoPort {
  getSaleInfoWithOption(partyId: string): Promise<SaleInfo>;
  getSaleInfoWithoutOption(partyId: string): Promise<SaleInfo>;
}
