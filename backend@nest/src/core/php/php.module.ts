import { Module } from '@nestjs/common';
import { PhpController } from './php.controller';
import { PhpService } from './php.service';

@Module({
  imports: [],
  controllers: [PhpController],
  providers: [PhpService],
})
export class PhpModule {}
