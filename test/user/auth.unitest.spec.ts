import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HttpStatus, HttpException } from '@nestjs/common';
import bcrypt from 'bcryptjs';

import { AuthService } from '../../src/auth/auth.service';
import { UsersService } from '../../src/users/users.service';
import { AuthRegisterLoginDto } from '../../src/auth/dto/auth-register-login.dto';
import { RoleEnum } from '../../src/roles/roles.enum';
import { Role } from '../../src/roles/entities/role.entity';
import { SessionService } from '../../src/session/session.service';
import { AuthEmailLoginDto } from '../../src/auth/dto/auth-email-login.dto'
import { UserEntity } from '../../src/users/entities/user.entity'
import { NullableType } from '../../src/utils/types/nullable.type';
import { Session } from '../../src/session/entities/session.entity'

import { getMockUserRepository, getMockSessionRepository } from './mock.repositories'


describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let sessionService: SessionService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        getMockUserRepository(),
        JwtService,
        SessionService,
        getMockSessionRepository(),
        ConfigService
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    sessionService = module.get<SessionService>(SessionService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('register', () => {
    it('should register a user and return confirmation message', async () => {
      const registerDto: AuthRegisterLoginDto | any = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockRole: Role | any = {
        id: RoleEnum.user,
      };

      const mockUser: any = {
        id: 1,
        email: 'test@example.com',
        role: mockRole,
      };

      jest.spyOn(usersService, 'create').mockResolvedValue(mockUser);
      const result = await authService.register(registerDto);

      expect(result).toEqual({ confirmation: 'You have successfully registed' });
      expect(usersService.create).toHaveBeenCalledWith({
        ...registerDto,
        email: registerDto.email,
        role: mockRole,
      });
    });

    it('should throw if user creation fails', async () => {
      const registerDto: AuthRegisterLoginDto | any = {
        email: 'test@example.com',
        password: 'password123',
      };

      jest.spyOn(usersService, 'create').mockRejectedValue(new Error('User creation failed'));

      await expect(authService.register(registerDto)).rejects.toThrowError('User creation failed');
    });

  });

  describe('login', () => {
    it('should throw .UNPROCESSABLE_ENTITY if user not found', async () => {
      // Arrange
      const loginDto: AuthEmailLoginDto = {
        email: 'nonexistent@example.com',
        password: 'password',
      };

      jest.spyOn(usersService, 'findOne').mockResolvedValue(undefined as unknown as NullableType<UserEntity>);

      // Act and Assert
      await expect(authService.login(loginDto)).rejects.toThrowError(
        new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              email: 'notFound',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        ),
      );
    });
    it('should throw .UNPROCESSABLE_ENTITY if password is incorrect', async () => {
      const loginDto: AuthEmailLoginDto = {
        email: 'existing@example.com',
        password: 'incorrectPassword',
      };

      const existingUser = {
        id: 1,
        email: 'existing@example.com',
        password: await bcrypt.hash('correctPassword', 10),
        role: { id: 1, name: 'user' },
      };

      jest.spyOn(usersService, 'findOne').mockResolvedValue(existingUser as UserEntity);

      // Act and Assert
      await expect(authService.login(loginDto)).rejects.toThrowError(
        new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              password: 'incorrectPassword',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        ),
      );
    });

    it('should return a token if login is successful', async () => {
      // Arrange
      const loginDto: AuthEmailLoginDto = {
        email: 'jean@gmail.com',
        password: 'Password@123',
      };

      const existingUser = {
        id: 1,
        email: 'jean@gmail.com',
        password: await bcrypt.hash('Password@123', 10),
        role: { id: 1, name: 'user' },
      };

      const createdSession = {
        id: 1,
        user: existingUser,
      };
      const compareMock = jest.fn().mockResolvedValue(true);
      jest.spyOn(bcrypt, 'compare').mockImplementation(compareMock);

      jest.spyOn(usersService, 'findOne').mockResolvedValue(existingUser as UserEntity);

      jest.spyOn(sessionService, 'create').mockResolvedValue(createdSession as Session);
      jest.spyOn(authService, 'getTokensData' as keyof AuthService)
        .mockResolvedValue(Promise.resolve({
          token: 'generatedToken',
          refreshToken: 'generatedRefreshToken',
          tokenExpires: 1234567890,
        }));

      const result = await authService.login(loginDto);

      expect(result).toEqual({ token: 'generatedToken' });
      expect(compareMock).toHaveBeenCalledWith(loginDto.password, existingUser.password);
    });
  })
});
