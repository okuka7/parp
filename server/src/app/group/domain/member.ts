export class Member {
  private id: string;
  private name: string;
  private role: MemberRole;

  constructor({
    id,
    name,
    role,
  }: {
    id: string;
    name?: string;
    role: MemberRole;
  }) {
    this.id = id;
    this.name = name || '';
    this.role = role;
  }

  public getId(): string {
    return this.id;
  }

  public getRole(): MemberRole {
    return this.role;
  }

  public getName(): string {
    return this.name;
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

export const MemberRole = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER',
} as const;

type MemberRole = (typeof MemberRole)[keyof typeof MemberRole];
