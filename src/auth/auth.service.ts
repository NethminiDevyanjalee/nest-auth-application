import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async login(loginDto: LoginDto) {
        const user = await this.userModel.findOne({
          username: loginDto.username,
        });
    
        if (!user) {
          return 'Invalid User Name';
        }
    
        const isMatch = await bcrypt.compare(loginDto.password, user.password);
    
        if (!isMatch) {
          return 'Invalid Password';
        }
    
        return 'Login successful';
      }
}
