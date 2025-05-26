import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

//handles db calls
@Injectable()
export class PostsRepository {
    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>,
    ) {}

    async findAll(): Promise<Post[]> {
        return this.postModel.find().exec();
    }

    async findById(id: string): Promise<Post | null> {
        return this.postModel.findById(id).exec();
    }

    async post(data: CreatePostDto): Promise<Post> {
        const newPost = new this.postModel(data);
        return newPost.save();
    }

    async update(id: string, data: UpdatePostDto): Promise<Post | null> {
        return this.postModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async destroy(id: string): Promise<boolean> {
        const res = await this.postModel.deleteOne({ _id: id }).exec();
        return res.deletedCount > 0;
    }
}
