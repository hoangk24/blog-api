import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserSubscriber } from './user.subscriber';
import { UsersAdminService } from './userAdmin.service';
import { UsersAdminController } from './userAdmin.controller';
import { PostModule } from '@/post/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => PostModule)],
  controllers: [
    //TODO: UsersController,
    UsersAdminController,
  ],
  providers: [UsersService, UserSubscriber, UsersAdminService],
  exports: [UsersService, UsersAdminService],
})
export class UsersModule {}
