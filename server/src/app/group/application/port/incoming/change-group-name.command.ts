export class ChangeGroupNameCommand {
  constructor(
    public readonly groupId: string,
    public readonly userId: string,
    public readonly name: string,
  ) {}
}
