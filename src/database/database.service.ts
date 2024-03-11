import { Injectable } from '@nestjs/common';
import { User } from 'src/user/interfaces/user.interface';

@Injectable()
export class DatabaseService {
  users: Omit<User, 'password'>[] = [];
}
