import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { MemberRepository } from './repository/member.repository';
import SupabaseService from './supabase.service';

@Module({
  controllers: [MemberController],
  providers: [
    MemberService,
    SupabaseService,
    {
      provide: 'IMemberRepository',
      useClass: MemberRepository,
    },
  ],
})
export class MemberModule {}
