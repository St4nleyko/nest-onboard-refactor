import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
      @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findOne(id: string): Promise<Post | null> {
    return this.postModel.findById(id).exec();
  }

  async create(data: CreatePostDto): Promise<Post> {
    const newPost = new this.postModel(data);
    return newPost.save();
  }

  async update(id: string, data: UpdatePostDto): Promise<Post | null> {
    return this.postModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async remove(id: string): Promise<boolean> {
    const res = await this.postModel.deleteOne({ _id: id }).exec();
    return res.deletedCount > 0;
  }
}
