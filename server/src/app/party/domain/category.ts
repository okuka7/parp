import { Entity, PrimaryKey } from '@mikro-orm/core';

@Entity({
  tableName: 'party_category',
})
export class Category {
  @PrimaryKey({ length: 10 })
  name!: string;

  constructor(name: string) {
    this.name = name;
  }
}
