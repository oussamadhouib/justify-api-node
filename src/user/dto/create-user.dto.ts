import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    default: 'foo@bar.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    default: '*********',
  })
  @IsNotEmpty()
  password: string;
}
