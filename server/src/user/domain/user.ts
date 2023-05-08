export class User {
  constructor(
    private id: string,
    private email: string,
    private name: string,
    private phoneNumber: string,
    private createdAt: Date,
  ) {}

  getId(): string {
    return this.id;
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
      createdAt: this.createdAt,
    };
  }
}
