import { Member } from './member';
import { v4 as uuidv4 } from 'uuid';

export class Group {
  private id: string;
  private name: string;
  private member: Member[];

  constructor({
    id,
    name,
    member: member,
  }: {
    id: string;
    name: string;
    member: Member[];
  }) {
    this.id = id;
    this.name = name;
    this.member = member;
  }

  public static create(name: string): Group {
    const id = uuidv4();
    return new Group({ id, name, member: [] });
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getMembers(): Member[] {
    return this.member;
  }

  public addMember(member: Member): void {
    this.member.push(member);
  }

  public removeMember(memberId: string): void {
    this.member = this.member.filter((m) => m.getId() !== memberId);
  }

  public changeName(name: string): void {
    this.name = name;
  }
}
