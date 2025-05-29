// src/users/users.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepo: UsersRepository) {}

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepo.findByEmail(email);
    }

    async register(dto: CreateUserDto): Promise<User> {
        const existing = await this.findByEmail(dto.email);
        if (existing) {
            throw new ConflictException('Email already registered');
        }

        const hashed = await bcrypt.hash(dto.password, 10);
        return this.usersRepo.createUser({
            email: dto.email,
            password: hashed,
        });
    }

    async validateCredentials(email: string, password: string): Promise<Partial<User> | null> {
        const user = await this.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...safeUser } = user.toObject();
            return safeUser;
        }
        return null;
    }

    async findAll(): Promise<Partial<User>[]> {
        const users = await this.usersRepo.findAll();
        // remove password from all users
        return users.map(user => {
            const { password, ...safeUser } = user.toObject();
            return safeUser;
        });
    }
}
