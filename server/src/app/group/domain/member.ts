import { User } from '@common/mikro-orm/entity/user.entity';
import {
  Entity,
  Enum,
  Formula,
  ManyToOne,
  OneToMany,
  Reference,
} from '@mikro-orm/core';
import { Group } from './group';

enum MemberRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

@Entity()
export class Member {
  @ManyToOne(() => User, { primary: true })
  user!: User;

  @Formula('user_name', { persist: false })
  name?: string;

  @Enum({ items: () => MemberRole, default: MemberRole.MEMBER })
  role!: MemberRole;

  @OneToMany(() => Group, (group) => group.member, { primary: true })
  group!: Group;

  static create(userId: string, groupId: string): Member {
    const instance = new Member();
    instance.user = Reference.createFromPK(User, userId);
    instance.role = MemberRole.MEMBER;
    instance.group.id = groupId;
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
