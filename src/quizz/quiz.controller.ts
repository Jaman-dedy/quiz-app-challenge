import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  HttpStatus,
  HttpCode,
  SerializeOptions,
  Request,
} from '@nestjs/common';
import { EventPattern, Payload, Ctx } from '@nestjs/microservices';
import { NatsStreamingContext } from '@nestjs-plugins/nestjs-nats-streaming-transport';

import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { QuizEntity } from './entities/quiz.entity';
import { Patterns } from '../contants/events.enum'


@ApiTags('Quiz')
@Controller({
  path: 'quizzes',
  version: '1',
})
export class QuizController {
  constructor(private readonly QuizService: QuizService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createQuizzDto: CreateQuizDto, @Request() req): Promise<QuizEntity[] | any> {
    const userId = req.user.id;
    const streakBonus = 5
    return await this.QuizService.createAllQuiz(createQuizzDto, userId, streakBonus);
  }

  @EventPattern(Patterns.quizCreated)
  public async stationCreatedHandler(@Payload() data: { quiz: number, user: string }, @Ctx() context: NatsStreamingContext) {
    console.log(`-- Received quiz: ${data.quiz}, Creator: ${data.user} ---`)
    context.message.ack()
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(HttpStatus.OK)
  getAllQuizzes() {
    return this.QuizService.getAvailableQuizzes()
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getQuiz(@Param('id') id: number) {
    try {
      return this.QuizService.getQuizWithDetails(id);
    } catch (error) {
      throw error
    }

  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles(RoleEnum.participant)
  @UseGuards(RolesGuard)
  @Get(':id/score')
  @HttpCode(HttpStatus.OK)
  getQuizScore(@Param('id') quizId: number, @Request() req) {
    const participantId = req.user.id;
    try {
      return this.QuizService.getParticipantScoresInQuiz(participantId, quizId)
    } catch (error) {
      throw error
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @SerializeOptions({
    groups: ['creator'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateQuizDto: UpdateQuizDto | any,
  ): Promise<QuizEntity> {
    return this.QuizService.update(id, updateQuizDto);
  }
}
