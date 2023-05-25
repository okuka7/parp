import { RegisterInfoCommand } from './command/register.info.command';

export const REGISTER_INFO_USECASE = Symbol('REGISTER_INFO_USECASE');

export interface RegisterInfoUsecase {
  registerPartyInfo(command: RegisterInfoCommand): Promise<void>;
}
