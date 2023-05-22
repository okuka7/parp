import { Member } from './member';
import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { PrimaryUlid } from '@lib/decorator/db.ulid.decorator';
import { ulid } from 'ulid';

@Entity()
export class Group {
  @PrimaryUlid()
  id!: string;

  @Property()
  name!: string;

  @ManyToOne(() => Member)
  member: Member[];

  public static create(name: string): Group {
    const instance = new Group();
    instance.id = ulid();
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
