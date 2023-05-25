import { CancelPartyCommand } from './command/cancel.party.command';

export const CANCLE_PARTY_USECASE = Symbol('CANCLE_PARTY_USECASE');

export interface CancelPartyUseCase {
  cancelParty(command: CancelPartyCommand): Promise<void>;
}
