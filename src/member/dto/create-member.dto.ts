import {
  IsString,
  IsEmail,
  IsBoolean,
  IsEnum,
  IsArray,
  IsUrl,
  IsNotEmpty,
  ArrayNotEmpty,
} from 'class-validator';
import { Team } from '../enum/enums';

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsUrl()
  @IsNotEmpty()
  avatar: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Team, { each: true })
  teams: Team[];
}
