import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

export class UserDto {
  id:string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @Length(2)
  countryCode: string;

  @IsNotEmpty()
  password: string;
}
