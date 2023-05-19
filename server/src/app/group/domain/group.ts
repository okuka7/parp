import { Member } from './member';
import { v4 as uuidv4 } from 'uuid';
import { Entity, ManyToOne, Property } from '@mikro-orm/core';

@Entity()
export class Group {
  @Property({ type: 'uuid', primary: true })
  id!: string;

  @Property()
  name!: string;

  @ManyToOne(() => Member)
  member: Member[];

  public static create(name: string): Group {
    const instance = new Group();
    instance.id = uuidv4();
    instance.name = name;
    instance.member = [];
    return instance;
  }

  public addMember(member: Member): void {
    this.member.push(member);
  }

  public removeMember(memberId: string): void {
    this.member = this.member.filter((m) => m.user.id !== memberId);
  }

  public changeName(name: string): void {
    this.name = name;
  }
}
