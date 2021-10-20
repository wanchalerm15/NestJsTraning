import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenService } from './authen.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@ApiTags('Authentication')
@Controller('authen')
export class AuthenController {
  constructor(private readonly authenService: AuthenService) { }

  @ApiOperation({ summary: "ลงทะเบียนสมัครสมาชิก" })
  @Post('signup')
  async Signup(@Body() model: SignupDto) {
    return this.authenService.signup(model).then(m => ({ ...m['_doc'], password: '' }));
  }

  @ApiOperation({ summary: "เข้าสู่ระบบยืนยันตัวตน" })
  @Post('signin')
  async Signin(@Body() model: SigninDto) {
    return this.authenService.signin(model).then(m => ({ ...m['_doc'], password: '' }));
  }
}
