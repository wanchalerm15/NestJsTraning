import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AccountDocument = Account & Document;

@Schema()
export class Account {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    @Prop({ required: true })
    firstname: string;

    @Prop()
    lastname: string;

    @Prop({ default: Date.now })
    created: Date;

    @Prop({ default: Date.now })
    updated: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);