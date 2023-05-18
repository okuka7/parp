import { IsString } from 'class-validator';

export class CreateGroupRequestDto {
  @IsString()
  readonly name: string;
}
