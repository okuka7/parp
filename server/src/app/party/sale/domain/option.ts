import { Money } from '@common/value';

export class PartyOption {
  constructor(
    private _partyId: string,
    private _id: number,
    private _name: string,
    private _price: Money,
    private _maxCount: number,
    private _soldCount: number = 0,
  ) {}

  public get partyId(): string {
    return this._partyId;
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get price(): Money {
    return this._price;
  }

  public get soldCount(): number {
    return this._soldCount;
  }

  public get maxCount(): number {
    return this._maxCount;
  }

  public get isSoldOut(): boolean {
    return this._soldCount >= this._maxCount;
  }

  public updateName(name: string) {
    this._name = name;
  }

  public changePrice(price: Money) {
    this._price = price;
  }

  public rebalance(maxCount: number) {
    if (maxCount < this._soldCount) {
      throw new Error(
        `Cannot rebalance option. max count: ${maxCount} is less than sold count: ${this._soldCount}`,
      );
    }
    this._maxCount = maxCount;
  }
}
