// answer.controller.ts

import { Controller, Post, Body, Param, Get, NotFoundException, Request, UseGuards, SerializeOptions } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiHeader } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { EventPattern, Payload, Ctx } from '@nestjs/microservices';
import { NatsStreamingContext } from '@nestjs-plugins/nestjs-nats-streaming-transport';

import { RolesGuard } from '../roles/roles.guard';
import { RoleEnum } from '../roles/roles.enum';
import { Roles } from '../roles/roles.decorator';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { AnswerEntity } from './entities/answer.entity';
import { Patterns } from '../contants/events.enum'


@ApiBearerAuth()
@ApiTags('Quiz')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  required: true,
})
@Roles(RoleEnum.participant)
@Controller({
  path: 'quizzes',
  version: '1',
})
export class AnswerController {
  constructor(private readonly answerService: AnswerService) { }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SerializeOptions({
    groups: ['participant'],
  })
  @Post(':id/answer')
  async createAnswer(@Param('quizId') quizId: number, @Body() createAnswerDto: CreateAnswerDto, @Request() req): Promise<AnswerEntity | {}> {
    const userId = req.user.id
    return this.answerService.createAnswer({ ...createAnswerDto, userId, quizId });
  }

  @EventPattern(Patterns.answerSubmitted)
  public async stationCreatedHandler(@Payload() data: { answer: number, user: string }, @Ctx() context: NatsStreamingContext) {
    console.log(`-- Received answer: ${data.answer}, Creator: ${data.user} ---`)
    context.message.ack()
  }


  
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SerializeOptions({
    groups: ['participant'],
  })
  @Get(':id')
  async getAnswer(@Param('id') id: number): Promise<AnswerEntity> {
    const answer = await this.answerService.getAnswerById(id);
    if (!answer) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }
    return answer;
  }
}
