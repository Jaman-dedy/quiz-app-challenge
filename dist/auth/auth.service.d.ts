import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { UsersService } from '../users/users.service';
import { NullableType } from '../utils/types/nullable.type';
import { LoginResponseType } from './types/login-response.type';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';
import { SessionService } from '../session/session.service';
import { JwtRefreshPayloadType } from './strategies/types/jwt-refresh-payload.type';
import { JwtPayloadType } from './strategies/types/jwt-payload.type';
export declare class AuthService {
    private jwtService;
    private usersService;
    private sessionService;
    private configService;
    constructor(jwtService: JwtService, usersService: UsersService, sessionService: SessionService, configService: ConfigService<AllConfigType>);
    validateLogin(loginDto: AuthEmailLoginDto): Promise<LoginResponseType>;
    authenticate(req: Request): Promise<UserEntity | null>;
    private extractToken;
    register(dto: AuthRegisterLoginDto): Promise<{
        confirmation: string;
    }>;
    me(userJwtPayload: JwtPayloadType): Promise<NullableType<UserEntity>>;
    update(userJwtPayload: JwtPayloadType, userDto: AuthUpdateDto): Promise<NullableType<UserEntity>>;
    refreshToken(data: Pick<JwtRefreshPayloadType, 'sessionId'>): Promise<Omit<LoginResponseType, 'user'>>;
    softDelete(user: UserEntity): Promise<void>;
    logout(data: Pick<JwtRefreshPayloadType, 'sessionId'>): Promise<void>;
    private getTokensData;
}
