import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupDto } from './dto/signup.dto';
import { Account, AccountDocument } from './entities/account.entity';
import * as bcrypt from 'bcrypt';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthenService {
    constructor(@InjectModel(Account.name) private account: Model<AccountDocument>) { }

    /** สมัครสมาชิกใหม่ */
    async signup(model: SignupDto): Promise<Account> {
        const count = await this.account.count({ username: model.username });
        if (count > 0) throw new HttpException("The username already exists", HttpStatus.BAD_REQUEST);
        // hash password
        model.password = await bcrypt.hash(model.password, 10);
        const create = new this.account(model);
        return create.save();
    }

    /** เข้าสู่ระบบ */
    async signin(model: SigninDto): Promise<Account> {
        const account = await this.account.findOne({ username: model.username });
        if (!account) throw new BadRequestException("The username is invalid");
        if (await bcrypt.compare(model.password, account.password)) return account;
        throw new BadRequestException("The password is invalid");
    }

}
