import { Injectable, Inject } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { IMemberRepository } from './repository/member-repository.interface';
import { QueryMemberDto } from './dto/query-member.dto';

@Injectable()
export class MemberService {
  constructor(
    @Inject('IMemberRepository')
    private memberRepository: IMemberRepository,
  ) {}

  findAll(query: QueryMemberDto) {
    return this.memberRepository.findAll(query);
  }

  findOne(id: number) {
    return this.memberRepository.findOne(id);
  }

  create(createMemberDto: CreateMemberDto) {
    return this.memberRepository.create(createMemberDto);
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return this.memberRepository.update(id, updateMemberDto);
  }

  remove(id: number) {
    return this.memberRepository.remove(id);
  }

  restore(id: number) {
    return this.memberRepository.restore(id);
  }

  removeAll(ids: number[]) {
    return this.memberRepository.removeAll(ids);
  }

  restoreAll(ids: number[]) {
    return this.memberRepository.restoreAll(ids);
  }
}
