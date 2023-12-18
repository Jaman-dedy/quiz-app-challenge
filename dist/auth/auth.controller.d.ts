import { AuthService } from './auth.service';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { LoginResponseType } from './types/login-response.type';
import { UserEntity } from '../users/entities/user.entity';
import { NullableType } from '../utils/types/nullable.type';
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    login(loginDto: AuthEmailLoginDto): Promise<LoginResponseType>;
    register(createUserDto: AuthRegisterLoginDto): Promise<{}>;
    me(request: any): Promise<NullableType<UserEntity>>;
    refresh(request: any): Promise<Omit<LoginResponseType, 'user'>>;
    logout(request: any): Promise<void>;
    update(request: any, userDto: AuthUpdateDto): Promise<NullableType<UserEntity>>;
    delete(request: any): Promise<void>;
}
