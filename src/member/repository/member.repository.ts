import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateMemberDto } from '../dto/create-member.dto';
import { UpdateMemberDto } from '../dto/update-member.dto';
import { QueryMemberDto } from '../dto/query-member.dto';
import { IMemberRepository } from './member-repository.interface';
import { MemberSortBy, Order, Team } from '../enum/enums';
import { Member } from '../entities/member.entity';
import SupabaseService from '../supabase.service';

@Injectable()
export class MemberRepository implements IMemberRepository {
  constructor(private supabaseService: SupabaseService) {}

  private async getMemberById(
    id: number,
    includeDeleted = false,
  ): Promise<Member> {
    const query = this.supabaseService.supabase
      .from('members')
      .select('*')
      .eq('id', id);

    if (!includeDeleted) {
      query.is('deletedAt', null);
    }

    const { data, error } = await query.single();

    if (error || !data) {
      throw new NotFoundException(`Member with ID '${id}' not found`);
    }

    return data;
  }

  private async updateMembersByIds(
    ids: number[],
    updateData: object,
  ): Promise<Member[]> {
    const { data, error } = await this.supabaseService.supabase
      .from('members')
      .update(updateData)
      .in('id', ids)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async findAll(
    query: QueryMemberDto,
  ): Promise<{ items: Member[]; count: number }> {
    const {
      page = 1,
      limit = 10,
      sortBy = MemberSortBy.ID,
      order = Order.ASC,
      search,
    } = query;
    const skip = (page - 1) * limit;

    let filterQuery = this.supabaseService.supabase
      .from('members')
      .select('*', { count: 'exact' })
      .order(sortBy, { ascending: order === Order.ASC })
      .is('deletedAt', null)
      .range(skip, skip + limit - 1)
      .limit(limit);

    if (search) {
      const searchFilters = [
        `name.ilike.%${search}%`,
        `userName.ilike.%${search}%`,
        `email.ilike.%${search}%`,
        `role.ilike.%${search}%`,
      ];

      if (!isNaN(Number(search))) {
        searchFilters.push(`id.eq.${Number(search)}`);
      }

      if (Object.values(Team).includes(search as Team)) {
        searchFilters.push(`teams.cs.{${search}}`);
      }

      filterQuery = filterQuery.or(searchFilters.join(','));
    }

    const { data, count, error } = await filterQuery;

    if (error) throw new Error(error.message);

    return { items: data, count };
  }

  async findOne(id: number): Promise<Member> {
    return this.getMemberById(id);
  }

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const { data, error } = await this.supabaseService.supabase
      .from('members')
      .insert([createMemberDto])
      .single();

    if (error) {
      if (error.message.includes('duplicate key value')) {
        throw new ConflictException(
          'A member with the same username or email already exists.',
        );
      }
      throw new Error(error.message);
    }

    return data[0];
  }

  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<Member> {
    const { data, error } = await this.supabaseService.supabase
      .from('members')
      .update({ ...updateMemberDto, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select();

    if (error) {
      if (error.message.includes('duplicate key value')) {
        throw new ConflictException(
          'A member with the same username or email already exists.',
        );
      }
      throw new Error(error.message);
    }

    return data[0];
  }

  async remove(id: number): Promise<Member> {
    await this.updateMembersByIds([id], {
      deletedAt: new Date().toISOString(),
    });
    return this.getMemberById(id, true);
  }

  async restore(id: number): Promise<Member> {
    await this.updateMembersByIds([id], { deletedAt: null });
    return this.getMemberById(id);
  }

  async removeAll(ids: number[]): Promise<Member[]> {
    return this.updateMembersByIds(ids, {
      deletedAt: new Date().toISOString(),
    });
  }

  async restoreAll(ids: number[]): Promise<Member[]> {
    return this.updateMembersByIds(ids, { deletedAt: null });
  }
}
