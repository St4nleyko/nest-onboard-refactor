import {IsEnum, IsOptional, IsString, MinLength} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { PostType } from "../schemas/post.schema";

export class UpdatePostDto {
    @IsOptional()
    @IsString()
    @MinLength(1, { message: 'Title must not be empty' })
    @ApiProperty({
        description: 'Optional field - min. 1 letter',
        required: false,
        minLength: 1,
        default: "Post Placeholder",
        example: "Post Placeholder",
    })
    title?: string;

    @IsOptional()
    @IsString()
    @MinLength(1, { message: 'Content must not be empty' })
    @ApiProperty({
        description: 'Optional field - min. 1 letter',
        required: false,
        minLength: 1,
        default: "Hello Text",
        example: 'Hello Text',
    })
    content?: string;

    @IsOptional()
    @IsEnum(PostType)
    @ApiProperty({
        enum: PostType,
        required: false,
    })
    type?: PostType;
}
