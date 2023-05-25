import { SaleInfo } from '@root/app/sale/domain/sale-info';

export const LOAD_SALE_INFO_PORT = Symbol('LOAD_SALE_INFO_PORT');

export interface LoadSaleInfoPort {
  findByPartyId(partyId: string): Promise<SaleInfo>;
}
