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
  ValidationPipe,
  ParseIntPipe
} from '@nestjs/common';
import { QuestionService } from './questions.service';
import { CreateQuestionDto } from './dto/create-questions.dto';
import { UpdateQuestionDto } from './dto/update-questions.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Quiz')
@Controller({
  path: 'quizzes',
  version: '1',
})
export class QuizController {
  constructor(private readonly QuestionService: QuestionService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createQuestion(@Body(new ValidationPipe()) createQuestionDto: CreateQuestionDto) {
    return await this.QuestionService.createQuestion({...createQuestionDto});
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllQuestions() {
    return this.QuestionService.getAllQuestion()
  }


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
