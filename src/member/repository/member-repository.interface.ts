import { CreateMemberDto } from '../dto/create-member.dto';
import { UpdateMemberDto } from '../dto/update-member.dto';
import { QueryMemberDto } from '../dto/query-member.dto';
import { Member } from '../entities/member.entity';

export interface IMemberRepository {
  findAll(query: QueryMemberDto): Promise<{ items: Member[]; count: number }>;
  findOne(id: number): Promise<Member>;
  create(createMemberDto: CreateMemberDto): Promise<Member>;
  update(id: number, updateMemberDto: UpdateMemberDto): Promise<Member>;
  remove(id: number): Promise<Member>;
  restore(id: number): Promise<Member>;
  removeAll(ids: number[]): Promise<Member[]>;
  restoreAll(ids: number[]): Promise<Member[]>;
}
