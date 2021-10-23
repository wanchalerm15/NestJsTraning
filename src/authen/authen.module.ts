import { Module } from '@nestjs/common';
import { AuthenService } from './services/authen.service';
import { AuthenController } from './authen.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './entities/account.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './services/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema }
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '20m' }
    }),
  ],
  controllers: [AuthenController],
  providers: [AuthenService, JwtStrategy]
})
export class AuthenModule { }
