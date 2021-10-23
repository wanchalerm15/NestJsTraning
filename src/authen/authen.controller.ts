import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthenService } from './services/authen.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@ApiTags('Authentication')
@Controller('authen')
export class AuthenController {
  constructor(private readonly authenService: AuthenService) { }

  @ApiOperation({ summary: "ลงทะเบียนสมัครสมาชิก" })
  @Post('signup')
  async Signup(@Body() model: SignupDto) {
    return this.authenService.signup(model).catch(err => new BadRequestException(err));
  }

  @ApiOperation({ summary: "เข้าสู่ระบบยืนยันตัวตน" })
  @Post('signin')
  async Signin(@Body() model: SigninDto) {
    return this.authenService.signin(model).catch(err => new BadRequestException(err));
  }

  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: 'ดึงข้อมูลผู้ใช้ที่เข้าสู่ระบบ' })
  @ApiBearerAuth()
  @Get('profile')
  async Profile(@Req() req: Request) {
    return req.user;
  }
}
