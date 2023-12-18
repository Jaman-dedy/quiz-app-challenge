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
  ValidationPipe,
  ParseIntPipe
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiHeader } from '@nestjs/swagger';
import { QuestionService } from './questions.service';
import { CreateQuestionDto } from './dto/create-questions.dto';
import { UpdateQuestionDto } from './dto/update-questions.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';

@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  required: true,
})
@ApiTags('Questions')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'quizzes',
  version: '1',
})
export class QuizController {
  constructor(private readonly QuestionService: QuestionService) { }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createQuestion(@Body(new ValidationPipe()) createQuestionDto: CreateQuestionDto) {
    return await this.QuestionService.createQuestion({...createQuestionDto});
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAllQuestions() {
    return this.QuestionService.getAllQuestion()
  }


  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getQuestion(@Param('id', ParseIntPipe) id: number) {
    return this.QuestionService.getQuestion(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateQuestion: UpdateQuestionDto | any,
  ){
    return this.QuestionService.update(id, updateQuestion);
  }

}
