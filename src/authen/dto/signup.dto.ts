import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";
import { Match } from "../decorator/match.decorator";

export class SignupDto {
    @ApiProperty()
    @Matches(/^[A-z0-9]{5,10}$/)
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @Matches(/^[A-z0-9]{5,10}$/)
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @Match('password')
    @IsNotEmpty()
    cpassword: string;

    @ApiProperty()
    firstname: string;

    @ApiProperty()
    lastname: string;
}
