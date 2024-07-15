import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { QueryMemberDto } from './dto/query-member.dto';
import { DeleteMembersDto } from './dto/delete-members.dto';
import { RestoreMembersDto } from './dto/restore-members.dto';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  findAll(@Query() query: QueryMemberDto) {
    return this.memberService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.memberService.findOne(id);
  }

  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.memberService.update(id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.memberService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.memberService.restore(id);
  }

  @Post('delete-all')
  removeAll(@Body() deleteMembersDto: DeleteMembersDto) {
    return this.memberService.removeAll(deleteMembersDto.ids);
  }

  @Post('restore-all')
  restoreAll(@Body() restoreMembersDto: RestoreMembersDto) {
    return this.memberService.restoreAll(restoreMembersDto.ids);
  }
}
