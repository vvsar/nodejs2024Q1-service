import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/interfaces/user.entity';

@Injectable()
export class DatabaseService {
  users: UserEntity[] = [];
}
