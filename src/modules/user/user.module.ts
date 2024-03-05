import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserSubscriber } from './user.subscriber';
import { UsersAdminService } from './userAdmin.service';
import { UsersAdminController } from './userAdmin.controller';
import { UsersController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersAdminController, UsersController],
  providers: [UsersService, UsersAdminService, UserSubscriber],
  exports: [UsersService, UsersAdminService],
})
export class UsersModule {}
