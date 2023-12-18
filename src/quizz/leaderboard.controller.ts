// leaderboard.controller.ts

import { Controller, Get,   UseGuards, } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';
import { QuizService } from './quiz.service'; // Adjust the import path based on your actual file structure
import { LeaderboardDto } from './dto/leaderboard.dto'; // Adjust the import path based on your actual file structure


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'leaderboard',
  version: '1',
})
export class LeaderboardController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async getLeaderboard(): Promise<LeaderboardDto[]| {message: string}> {
    return this.quizService.getLeaderboard();
  }
}
