import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Email is invalid' })
  readonly email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  readonly password: string;

  @IsString({ message: 'Name must be a string' })
  @MinLength(1, { message: 'Name must be at least 1 characters long' })
  readonly name: string;

  @IsString({ message: 'PhoneNumber must be a string' })
  @IsPhoneNumber('KR', { message: 'PhoneNumber must be a string' })
  readonly phoneNumber: string;
}
