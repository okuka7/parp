import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { UseZodGuard, zodToOpenAPI, ZodValidationPipe } from 'nestjs-zod';
import { AuthService } from './auth.service';
import { LoginSchema } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('api/auth')
@UsePipes(ZodValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ schema: zodToOpenAPI(LoginSchema) })
  @UseZodGuard('body', LoginSchema)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: any) {
    return req.session;
  }

  @ApiResponse({ status: 200, description: '회원가입 성공' })
  @ApiResponse({ status: 400, description: '회원가입 실패' })
  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() res: any) {
    const { email, password, name, phoneNumber } = registerDto;
    const user = await this.authService.registerUser(
      email,
      password,
      name,
      phoneNumber,
    );
    if (user) {
      res.status(200).json({ message: 'User created', success: true });
    } else {
      res.status(400).json({ message: 'User not created', success: false });
    }
  }
}
