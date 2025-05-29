import {Body, Controller, Get, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {ApiTags, ApiCreatedResponse, ApiConflictResponse, ApiBody, ApiOperation, ApiOkResponse} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiBody({ type: CreateUserDto })
    @ApiCreatedResponse({ description: 'User registered successfully' })
    @ApiConflictResponse({ description: 'Email already registered' })
    async register(@Body() dto: CreateUserDto) {
        return this.usersService.register(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiOkResponse({ description: 'List of all users' })
    async getAll() {
        return this.usersService.findAll();
    }

}
