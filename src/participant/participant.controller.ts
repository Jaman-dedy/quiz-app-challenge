import {
  Controller,
  Post,
  UseGuards,
  HttpStatus,
  HttpCode,
  Request,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiHeader } from '@nestjs/swagger';
import { EventPattern, Payload, Ctx } from '@nestjs/microservices';
import { NatsStreamingContext } from '@nestjs-plugins/nestjs-nats-streaming-transport';


import { ParticipantService } from './participant.service';
import { Patterns } from '../contants/events.enum'

@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  required: true,
})
@UseGuards(AuthGuard('jwt'))
@ApiTags('Quiz')
@Controller({
  path: 'quizzes',
  version: '1',
})
export class ParticipantController {
  constructor(private readonly ParticipantService: ParticipantService) { }

  @Post(":id/participate")
  @HttpCode(HttpStatus.CREATED)
  async joinQuiz(@Param('id') quizId: number, @Request() req) {
    const userId = req.user.id;
    return await this.ParticipantService.joinQuiz({quizId, userId, streak: 0});
  }

  @EventPattern(Patterns.answerSubmitted)
  public async stationCreatedHandler(@Payload() data: { participant: number, quiz: number }, @Ctx() context: NatsStreamingContext) {
    console.log(`-- New participant: ${data.participant}, joined the quiz : ${data.quiz} ---`)
    context.message.ack()
  }

}
