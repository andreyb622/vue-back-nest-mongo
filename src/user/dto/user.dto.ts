import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
	@IsEmail()
	email: string;

	@IsNotEmpty()
	passwordHash: string;

	@IsString()
	role: string;
}
