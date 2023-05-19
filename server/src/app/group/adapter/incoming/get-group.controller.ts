import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Res,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import {
  GetGroupQuery,
  GET_GROUP_QUERY,
} from '../../application/port/incoming/get-group.query';
import {
  GetMemberQuery,
  GET_MEMBER_QUERY,
} from '../../application/port/incoming/get-member.query';
@Controller('group')
export class GetGroupController {
  constructor(
    @Inject(GET_GROUP_QUERY) private readonly getGroupQuery: GetGroupQuery,
    @Inject(GET_MEMBER_QUERY) private readonly getMemberQuery: GetMemberQuery,
  ) {}

  @ApiResponse({ status: HttpStatus.OK, description: 'Group found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Group not found' })
  @Get(':groupId')
  async getGroup(
    @Param('groupId', ParseUUIDPipe) groupId: string,
    @Res() res: Response,
  ) {
    try {
      const group = await this.getGroupQuery.getGroup(groupId);
      res.status(HttpStatus.OK).json(group);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Members Found' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Members not found',
  })
  @Get(':groupId/members')
  async getMembers(
    @Param('groupId', ParseUUIDPipe) groupId: string,
    @Res() res: Response,
  ) {
    try {
      const members = await this.getMemberQuery.getAllMembers(groupId);
      res.status(HttpStatus.OK).json(members);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
  }
}
