import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'user@gmailz.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'heslo123' })
    @IsString()
    @MinLength(6)
    password: string;
}
