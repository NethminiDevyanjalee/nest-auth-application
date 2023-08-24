import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login-dto';
import { CreateUserDto } from './dto/createuser-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) {}

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

        const payload = { username: user.username };
        const token = this.jwtService.sign(payload, { expiresIn: '3600s' }); 

        return { token }
      }

      async createUser(createUserDto: CreateUserDto) {
        const { username, password } = createUserDto;
        const existingUser = await this.userModel.findOne({ username });

        if (existingUser) {
            return 'UserName already exists';
        }

        const hash = await bcrypt.hash(password, 10);
        const user = new this.userModel({ username, password: hash });
        await user.save();

        return 'User created successfully';
      }
}
