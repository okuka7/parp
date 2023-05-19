import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @IsString({ message: 'Name must be string' })
  @MinLength(3, { message: 'Name must be at least 3 characters' })
  @MaxLength(25, { message: 'Name must be at most 25 characters' })
  name: string;
}
