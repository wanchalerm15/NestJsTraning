import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupDto } from '../dto/signup.dto';
import { Account, AccountDocument } from '../entities/account.entity';
import * as bcrypt from 'bcrypt';
import { SigninDto } from '../dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenService {
    constructor(
        @InjectModel(Account.name) private _account: Model<AccountDocument>,
        private _jwtService: JwtService,
    ) { }

    /** ดึงข้อมูลผู้ใช้งานที่เข้าสู่ระบบ */
    async profile(id: string) { return this._account.findById(id); }

    /** สมัครสมาชิกใหม่ */
    async signup(model: SignupDto) {
        const count = await this._account.count({ username: model.username });
        if (count > 0) throw new HttpException("The username already exists", HttpStatus.BAD_REQUEST);
        // hash password
        model.password = await bcrypt.hash(model.password, 10);
        const create = new this._account(model);
        return create.save()
            .then(item => {
                item.password = '';
                return item;
            });
    }

    /** เข้าสู่ระบบ */
    async signin(model: SigninDto) {
        const account = await this._account.findOne({ username: model.username });
        if (!account) throw new BadRequestException("The username is invalid");
        if (await bcrypt.compare(model.password, account.password)) {
            const payload = { username: account.username, sub: account.id };
            account.password = '';
            return {
                token: this._jwtService.sign(payload),
                user: account
            };
        }
        throw new BadRequestException("The password is invalid");
    }

}
