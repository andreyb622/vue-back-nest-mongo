import { IsArray, IsString } from 'class-validator';

export class UpdateBoardDto {
  @IsString()
  name: string;

  @IsArray()
  users: string[];
}
