import { IsOptional, IsInt, Min, IsString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { MemberSortBy, Order } from '../enum/enums';

export class QueryMemberDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = 10;

  @IsOptional()
  @IsEnum(MemberSortBy)
  sortBy?: MemberSortBy;

  @IsOptional()
  @IsEnum(Order)
  order?: Order = Order.ASC;

  @IsOptional()
  @IsString()
  search?: string;
}
