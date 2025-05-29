// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<Partial<User> | null> {
        return this.usersService.validateCredentials(email, password);
    }

    async login(user: Partial<User>) {
        const payload = { sub: user._id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
