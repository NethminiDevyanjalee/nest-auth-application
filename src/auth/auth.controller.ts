import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login-dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createuser-dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {

    constructor (private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('createuser')
    @UseGuards(AuthGuard)
    async createUser(@Body() createUserDto: CreateUserDto) {
        const response = await this.authService.createUser(createUserDto);
        return response;
    }
}
