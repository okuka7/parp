import { PartyInfo } from '@root/app/party/domain/info';

export const CREATE_INFO_PORT = Symbol('CREATE_INFO_PORT');

export interface CreateInfoPort {
  save(info: PartyInfo): Promise<PartyInfo>;
}
