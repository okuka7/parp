export class UserRegisteredEvent {
  constructor(readonly userId: string, readonly name: string) {}
}
