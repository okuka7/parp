export class CreateGroupCommand {
  constructor(public readonly name: string, public readonly ownerId: string) {}
}
