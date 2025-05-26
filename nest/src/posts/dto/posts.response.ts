import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '../schemas/post.schema';

export class PostResponse {
    @ApiProperty({ example: 'abc123' })
    id: string;

    @ApiProperty({ example: 'My first post' })
    title: string;

    @ApiProperty({ example: 'This is the content of the post.' })
    content: string;

    @ApiProperty({ enum: PostType, example: 'Article' })
    type: PostType;

    @ApiProperty({ example: '2024-01-01T12:00:00Z' })
    createdAt: string;

    @ApiProperty({ example: '2024-01-01T12:30:00Z' })
    updatedAt: string;
}
