import {Controller, Post, UseGuards, Request, Res, Get, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {ApiTags, ApiBody, ApiOperation, ApiOkResponse, ApiBearerAuth} from '@nestjs/swagger';
import { Response } from 'express';
import {JwtAuthGuard} from "./guards/jwt-auth.guard";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Login and get JWT token' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string', example: 'user@example.com' },
                password: { type: 'string', example: 'password123' },
            },
            required: ['email', 'password'],
        },
    })
    @ApiOkResponse({
        description: 'JWT access token generovany',
        schema: {
            example: {
                access_token: 'eyJhbGciOi...etc',
            },
        },
    })
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Res({ passthrough: true }) res: Response) {
        console.log('loggin in')
        const { access_token } = await this.authService.login(req.user);

        res.cookie('token', access_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });

        return { message: 'Logged in' };
    }


    @UseGuards(JwtAuthGuard)
    @Post('logout')
    @ApiOperation({ summary: 'Logout user by clearing cookisz' })
    @ApiOkResponse({
        description: 'User successfully logged out.',
        schema: {
            example: {
                message: 'Logged out',
            },
        },
    })
    logout(@Res({ passthrough: true }) res: Response) {
        console.log('[Logout] clearing cookie');
        res.clearCookie('token');
        return { message: 'Logged out' };
    }




    @Get('csrf-token')
    @ApiOperation({ summary: 'Get CSRF token for protected requests' })
    @ApiOkResponse({
        description: 'Returns a CSRF token',
        schema: {
            example: {
                csrfToken: 'abc123csrf...',
            },
        },
    })
    getCsrfToken(@Req() req: Request) {
        console.log((req as any).csrfToken())
        return { csrfToken: (req as any).csrfToken() };
    }

    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'get user to keep the session' })
    @Get('me')
    me(@Req() req) {
        console.log('keeping session:')
        console.log(req.user)

        return {
            email: req.user.email,
            userId: req.user.userId,
        };
    }

}
