import { User } from '@common/mikro-orm/entity/user.entity';
import { Entity, Enum, ManyToOne, Reference } from '@mikro-orm/core';
import { Group } from './group';

enum MemberRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

@Entity()
export class Member {
  @ManyToOne(() => Group, { primary: true, mapToPk: true })
  groupId!: string;

  @ManyToOne(() => User, { primary: true })
  user!: User;

  @Enum({ items: () => MemberRole, default: MemberRole.MEMBER })
  role!: MemberRole;

  static create(userId: string, groupId: string): Member {
    const instance = new Member();
    instance.groupId = groupId;
    instance.user = Reference.createFromPK(User, userId);
    instance.role = MemberRole.MEMBER;
    return instance;
  }

  public promoteToOwner(): void {
    this.role = MemberRole.OWNER;
  }

  public promoteToAdmin(): void {
    this.role = MemberRole.ADMIN;
  }

  public demoteToMember(): void {
    this.role = MemberRole.MEMBER;
  }

  public isOwner(): boolean {
    return this.role === MemberRole.OWNER;
  }

  public isAdmin(): boolean {
    return this.role === (MemberRole.OWNER || MemberRole.ADMIN);
  }
}
