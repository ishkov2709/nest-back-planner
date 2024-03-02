import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TaskDto } from './time-block.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: string): Promise<any> {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
    });
  }

  async create(dto: TaskDto, userId: string): Promise<any> {
    return this.prisma.task.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      } as any,
    });
  }

  async update(
    dto: Partial<TaskDto>,
    taskId: string,
    userId: string,
  ): Promise<any> {
    return this.prisma.task.update({
      where: {
        userId,
        id: taskId,
      },
      data: dto,
    });
  }

  async delete(taskId: string): Promise<any> {
    return this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
