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
import { OptionsService } from './options.service';
import { CreateOptionsDto } from './dto/create-options.dto';
import { UpdateOptionDto } from './dto/update-options.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Quiz')
@Controller({
  path: 'quizzes',
  version: '1',
})
export class OptionController {
  constructor(private readonly OptionsService: OptionsService) { }


  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOptions(@Body(new ValidationPipe()) createOptionsDto: CreateOptionsDto) {
    return await this.OptionsService.createOptions({...createOptionsDto});
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllOptions() {
    return this.OptionsService.getAllOptions
  }


  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOption(@Param('id', ParseIntPipe) id: number) {
    return this.OptionsService.getOption(id)
  }

  
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateOption: UpdateOptionDto | any,
  ){
    return this.OptionsService.update(id, updateOption);
  }

}
