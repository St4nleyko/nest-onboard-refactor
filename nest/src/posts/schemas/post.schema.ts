import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export enum PostType {
    Article = 'Article',
    Announcement = 'Announcement',
    Tutorial = 'Tutorial',
}
@Schema({ timestamps: true }) // adds createdAt, updatedAt
export class Post extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true, enum: PostType }) // ✅ this enforces enum in DB
    type: PostType;
}

export const PostSchema = SchemaFactory.createForClass(Post);
