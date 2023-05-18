import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Res,
  Session,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { ZodValidationPipe } from 'nestjs-zod';
import { AuthenticatedGuard } from 'src/auth/guard/authenticated.guard';
import { CreateGroupCommand } from 'src/group/application/port/incoming/create-group.command';
import { ManageGroupUsecase } from 'src/group/application/port/incoming/manage-group.usecase';
import { ManageMemberUsecase } from 'src/group/application/port/incoming/manage-member.usecase';
import { CreateGroupRequestDto } from 'src/group/dto/create-group.request.dto';
import { CreateMemberRequestDto } from 'src/group/dto/create-member.request.dto';

@UseGuards(AuthenticatedGuard)
@UsePipes(ZodValidationPipe)
@Controller('group')
export class ManageGroupController {
  constructor(
    private readonly manageGroupUsecase: ManageGroupUsecase,
    private readonly manageMemberUsecase: ManageMemberUsecase,
  ) {}

  @Post()
  async createGroup(
    @Body() createGroupDto: CreateGroupRequestDto,
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    try {
      const ownerId = session.userId;
      const createGroupCommand = new CreateGroupCommand(
        createGroupDto.name,
        ownerId,
      );
      await this.manageGroupUsecase.createGroup(createGroupCommand);
      res.status(HttpStatus.CREATED).json({ message: 'Group created' });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post(':groupId/members')
  async addMember(
    @Param('groupId') groupId: string,
    @Body() createMemberDto: CreateMemberRequestDto,
    @Res() res: Response,
  ) {
    try {
      const { memberIds } = createMemberDto;
      await this.manageMemberUsecase.addMember(groupId, memberIds);
      res.status(HttpStatus.CREATED).json({ message: 'Member added' });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Delete(':groupId')
  async deleteGroup(
    @Param('groupId') groupId: string,
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    try {
      const ownerId = session.userId;
      await this.manageGroupUsecase.deleteGroup(groupId, ownerId);
      res.status(HttpStatus.OK).json({ message: 'Group deleted' });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Delete(':groupId/members/:memberId')
  async removeMember(
    @Param('groupId') groupId: string,
    @Param('memberId') memberId: string,
    @Res() res: Response,
  ) {
    try {
      await this.manageMemberUsecase.removeMember(groupId, memberId);
      res.status(HttpStatus.OK).json({ message: 'Member removed' });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}
