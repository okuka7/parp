import { PlanPartyCommand } from './command/plan.new-party.command';

export const PLAN_PARTY_USECASE = Symbol('PLAN_PARTY_USECASE');

export interface PlanPartyUseCase {
  planParty(command: PlanPartyCommand): Promise<void>;
}
