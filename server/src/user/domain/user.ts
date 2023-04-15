import { Role } from './role';

export class User {
  constructor(
    private id: number,
    private email: string,
    private name: string,
    private phoneNumber: string,
    private role: Role,
    private createdAt: Date,
  ) {}

  getId(): number {
    return this.id;
  }

  getRole(): Role {
    return this.role;
  }

  getName(): string {
    return this.name;
  }

  changeName(name: string) {
    this.name = name;
  }

  changePhoneNumber(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }

  toPersistence(): any {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      phoneNumber: this.phoneNumber,
      role: this.role,
      createdAt: this.createdAt,
    };
  }
}
