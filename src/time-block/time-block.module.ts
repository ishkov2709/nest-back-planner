import { Module } from '@nestjs/common';
import { TaskController } from './time-block.controller';
import { PrismaService } from 'src/prisma.service';
import { TaskService } from './time-block.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService],
  exports: [TaskService],
})
export class TaskModule {}
