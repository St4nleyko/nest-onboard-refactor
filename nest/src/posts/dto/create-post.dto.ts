import {IsEnum, IsOptional, IsString, MinLength} from 'class-validator';
import {ApiProperty, ApiSchema} from "@nestjs/swagger";
import {PostType} from "../schemas/post.schema";
@ApiSchema({ name: 'Create Post Schema Requirements',
description:"Req for post create"})

export class CreatePostDto {
    @IsString()
    @MinLength(1, { message: 'Title must not be empty' })
    @ApiProperty({
        description: 'Required field - min. 1 letter',
        minLength: 1,
        default: "Post Placeholder",
    })
    title: string;

    @IsString()
    @IsOptional()
    @MinLength(1, { message: 'Content must not be empty' })
    @ApiProperty({
        description: 'Not required field - min. 1 letter',
        minLength: 1,
        default: "Hello Text",
        example: 'Hello Text',
        required:false,
    })

    content?: string;


    @IsEnum(PostType)
    @ApiProperty({ enum: PostType, example: PostType.Article })
    type: PostType;
}
