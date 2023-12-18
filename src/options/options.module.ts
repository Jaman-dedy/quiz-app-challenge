import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionController } from './options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionEntity } from './entities/options.entity';
import { IsExist } from '../utils/validators/is-exists.validator';
import { IsNotExist } from '../utils/validators/is-not-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([OptionEntity])],
  controllers: [OptionController],
  providers: [IsExist, IsNotExist, OptionsService],
  exports: [OptionsService],
})
export class OptionModule {}
