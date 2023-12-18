import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpStatus,
  HttpCode,
  Request,
} from '@nestjs/common';
import { EventPattern, Payload, Ctx } from '@nestjs/microservices';
import { NatsStreamingContext } from '@nestjs-plugins/nestjs-nats-streaming-transport';

import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { ApiBearerAuth, ApiTags, ApiHeader } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { QuizEntity } from './entities/quiz.entity';
import { Patterns } from '../contants/events.enum'


@ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
@ApiTags('Quiz')
@Controller({
  path: 'quizzes',
  version: '1',
})
export class QuizController {
  constructor(private readonly QuizService: QuizService) { }

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

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(HttpStatus.OK)
  getAllQuizzes() {
    return this.QuizService.getAvailableQuizzes()
  }

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
}
