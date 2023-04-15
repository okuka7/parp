import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: any) {
    return req.session;
  }

  @Post('register')
  async register(@Body() body: any, @Res() res: any) {
    const { email, password, name, phoneNumber } = body;
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
