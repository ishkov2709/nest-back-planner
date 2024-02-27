import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from 'prisma/node_modules/.prisma/client';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { hash } from 'argon2';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        tasks: true,
      },
    });
  }

  getByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        tasks: true,
      },
    });
  }

  async create(dto: AuthDto) {
    const user = {
      email: dto.email,
      name: '',
      password: await hash(dto.password),
    };

    return this.prisma.user.create({
      data: user,
    });
  }
}
