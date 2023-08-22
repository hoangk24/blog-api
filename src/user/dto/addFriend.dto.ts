import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddFriendRequest {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
