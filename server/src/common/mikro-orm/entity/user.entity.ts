import { Entity, PrimaryKey } from '@mikro-orm/core';

@Entity({
  tableName: 'users',
})
export class User {
  @PrimaryKey({ type: 'uuid' })
  id!: string;
}
