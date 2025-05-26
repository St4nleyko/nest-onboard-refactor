import { Injectable } from '@nestjs/common';
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
    return this.repo.findAll();
  }

  async findOne(id: string){
    return this.repo.findById(id);
  }


  async create(data: CreatePostDto) {
    return this.repo.post(data);
  }


  async update(id: string, data: UpdatePostDto) {
    return this.repo.update(id, data);
  }


  async remove(id: string) {
    return this.repo.destroy(id);
  }
}
