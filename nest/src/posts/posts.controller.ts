import {
  Controller,
  Get,
  Post as HttpPost,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  BadRequestException, UseGuards
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiBadRequestResponse, ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation, ApiParam,
  ApiTags
} from "@nestjs/swagger";
import {PostResponse} from "./dto/posts.response";
import {isValidObjectId} from "mongoose";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";


@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Gets all posts' })
  @ApiOkResponse({
    description: 'List of posts',
    type: [PostResponse],
  })
  @ApiBearerAuth('access-token')
  @Get()
  async index() {
    return await this.postsService.findAll();
  }

  @ApiOperation({ summary: 'Gets specific post' })
  @ApiParam({ name: 'id', type: String, description: 'Post ID' })
  @ApiOkResponse({
    description: 'One post',
    type: PostResponse,
  })
  @ApiNotFoundResponse({ description: 'Post not found' })
  @ApiBadRequestResponse({ description: 'Invalid ID format' })
  @ApiBearerAuth('access-token')
  @Get(':id')
    async show(@Param('id') id: string) {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('Invalid ID format');
      }

      const post = await this.postsService.findOne(id);
      if (!post) throw new NotFoundException('Post not found');
      return post;
    }

  @ApiOperation({ summary: 'Creates a post' })
  @ApiCreatedResponse({
    description: 'Post successfully created',
    type: PostResponse,
  })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiBearerAuth('access-token')
  @HttpPost()
  async store(@Body() data: CreatePostDto) {
    return await this.postsService.create(data);
  }

  @ApiOperation({ summary: 'Updates a post' })
  @ApiParam({ name: 'id', type: String, description: 'Post ID' })
  @ApiOkResponse({
    description: 'Post successfully updated',
    type: PostResponse,
  })
  @ApiNotFoundResponse({ description: 'Post not found' })
  @ApiBadRequestResponse({ description: 'Invalid ID format or validation error' })
  @ApiBearerAuth('access-token')
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdatePostDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const updated = await this.postsService.update(id, data);
    if (!updated) throw new NotFoundException('Post not found');
    return updated;
  }

  @ApiOperation({ summary: 'Deletes a post' })
  @ApiParam({ name: 'id', type: String, description: 'Post ID' })
  @ApiNoContentResponse({ description: 'Post successfully deleted' })
  @ApiNotFoundResponse({ description: 'Post not found' })
  @ApiBadRequestResponse({ description: 'Invalid ID format' })
  @ApiBearerAuth('access-token')
  @Delete(':id')
  async destroy(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const success = await this.postsService.remove(id);
    if (!success) throw new NotFoundException('Post not found');
    // return { success: true };
  }
}
