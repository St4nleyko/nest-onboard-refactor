import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {PostsRepository} from "./posts.repository";

//handles logic/validations
@Injectable()
export class PostsService {
  constructor(private readonly repo: PostsRepository) {}

  async findAll() {
    if(1 === 1){
      return this.repo.findAll();
    }
  }

  async findOne(id: string){
    const post = await this.repo.findById(id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }


  async create(data: CreatePostDto) {
    if (!data.title || data.title.trim().length < 3) {
      throw new BadRequestException('Title is required and must be at least 3 characters');
    }
    if (!data.type || !['Article', 'Announcement', 'Tutorial'].includes(data.type)) {
      throw new BadRequestException('Invalid type');
    }
    return this.repo.post(data);
  }


  async update(id: string, data: UpdatePostDto) {
    const updated = await this.repo.update(id, data);
    if (!updated) {
      throw new NotFoundException(`Cannot update. Post with ID ${id} not found`);
    }
    return updated;
  }


  async remove(id: string) {
    const deleted = await this.repo.destroy(id);
    if (!deleted) {
      throw new NotFoundException(`Cannot delete. Post with ID ${id} not found`);
    }
    return deleted;
  }
}
