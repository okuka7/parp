import { SaleInfo } from '../../../domain/sale-info';

export const CREATE_SALE_INFO_PORT = Symbol('CREATE_SALE_INFO_PORT');

export interface CreateSaleInfoPort {
  createSaleInfo(info: SaleInfo): Promise<boolean>;
}
