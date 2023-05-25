import { Category } from '@root/app/party/domain/category';

export const LOAD_CATEGORY_PORT = Symbol('LOAD_CATEGORY_PORT');

export interface LoadCategoryPort {
  findByName(name: string): Promise<Category>;
}
