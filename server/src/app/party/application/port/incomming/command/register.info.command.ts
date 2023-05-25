import {
  IsString,
  MaxLength,
  MinLength,
  validateOrReject,
} from 'class-validator';

export class RegisterInfoCommand {
  @IsString({ message: 'Category must be a string' })
  @MinLength(1, { message: 'Category must be at least 1 character long' })
  @MaxLength(10, { message: 'Category must be less than 10 characters long' })
  readonly category: string;

  @IsString({ message: 'Party name is not string.' })
  @MinLength(3, { message: 'Party name is too short.' })
  @MaxLength(50, { message: 'Party name is too long.' })
  readonly name: string;

  @IsString({ message: 'Description is not string.' })
  readonly description: string;

  @IsString({ message: 'Notes is not string.' })
  readonly notes: string;

  constructor(
    category: string,
    name: string,
    description: string,
    notes: string,
  ) {
    this.category = category;
    this.name = name;
    this.description = description;
    this.notes = notes;
    validateOrReject(this);
  }
}
