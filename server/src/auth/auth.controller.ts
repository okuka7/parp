import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: any) {
    return req.session;
  }

  @ApiResponse({ status: 200, description: '회원가입 성공' })
  @ApiResponse({ status: 400, description: '회원가입 실패' })
  @Post('register')
  async register(
    @Req() req: Request,
    @Body() registerDto: RegisterDto,
    @Res() res: Response,
  ) {
    const { email, password, name, phoneNumber } = registerDto;
    const user = await this.authService.registerUser(
      email,
      password,
      name,
      phoneNumber,
    );
    if (user) {
      req.login(user, (err) => {
        if (err) {
          res
            .status(400)
            .json({ message: '회원가입에 실패했습니다. 다시 시도해주세요.' });
        }
        res.status(200).json({ message: 'User created', success: true });
      });
    } else {
      res.status(400).json({ message: 'User not created', success: false });
    }
  }
}
