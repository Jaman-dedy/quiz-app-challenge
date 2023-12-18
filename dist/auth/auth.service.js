"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const ms_1 = __importDefault(require("ms"));
const jwt_1 = require("@nestjs/jwt");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const roles_enum_1 = require("../roles/roles.enum");
const users_service_1 = require("../users/users.service");
const config_1 = require("@nestjs/config");
const session_service_1 = require("../session/session.service");
let AuthService = class AuthService {
    constructor(jwtService, usersService, sessionService, configService) {
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.sessionService = sessionService;
        this.configService = configService;
    }
    async validateLogin(loginDto) {
        const user = await this.usersService.findOne({
            email: loginDto.email,
        });
        if (!user) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    email: 'notFound',
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const isValidPassword = await bcryptjs_1.default.compare(loginDto.password, user.password);
        if (!isValidPassword) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    password: 'incorrectPassword',
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const session = await this.sessionService.create({
            user,
        });
        const { token, refreshToken, tokenExpires } = await this.getTokensData({
            id: user.id,
            role: user.role,
            sessionId: session.id,
        });
        return {
            token,
        };
    }
    async authenticate(req) {
        const token = this.extractToken(req);
        if (!token) {
            return null;
        }
        try {
            const decoded = this.jwtService.verify(token);
            const user = { id: decoded.sub, username: decoded.username };
            return user;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    extractToken(req) {
        const authHeader = req.headers['authorization'];
        console.log('authHeader :>> ', authHeader);
        if (authHeader && authHeader.startsWith('Bearer ')) {
            return authHeader.slice(7);
        }
        return null;
    }
    async register(dto) {
        await this.usersService.create(Object.assign(Object.assign({}, dto), { email: dto.email, role: {
                id: roles_enum_1.RoleEnum.user,
            } }));
        return { confirmation: "You have successfully registed" };
    }
    async me(userJwtPayload) {
        return this.usersService.findOne({
            id: userJwtPayload.id,
        });
    }
    async update(userJwtPayload, userDto) {
        if (userDto.password) {
            if (!userDto.oldPassword) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        oldPassword: 'missingOldPassword',
                    },
                }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
            const currentUser = await this.usersService.findOne({
                id: userJwtPayload.id,
            });
            if (!currentUser) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        user: 'userNotFound',
                    },
                }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
            const isValidOldPassword = await bcryptjs_1.default.compare(userDto.oldPassword, currentUser.password);
            if (!isValidOldPassword) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        oldPassword: 'incorrectOldPassword',
                    },
                }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
            else {
                await this.sessionService.softDelete({
                    user: {
                        id: currentUser.id,
                    },
                    excludeId: userJwtPayload.sessionId,
                });
            }
        }
        await this.usersService.update(userJwtPayload.id, userDto);
        return this.usersService.findOne({
            id: userJwtPayload.id,
        });
    }
    async refreshToken(data) {
        const session = await this.sessionService.findOne({
            where: {
                id: data.sessionId,
            },
        });
        if (!session) {
            throw new common_1.UnauthorizedException();
        }
        const { token, refreshToken, tokenExpires } = await this.getTokensData({
            id: session.user.id,
            role: session.user.role,
            sessionId: session.id,
        });
        return {
            token,
        };
    }
    async softDelete(user) {
        await this.usersService.softDelete(user.id);
    }
    async logout(data) {
        return this.sessionService.softDelete({
            id: data.sessionId,
        });
    }
    async getTokensData(data) {
        const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
            infer: true,
        });
        const tokenExpires = Date.now() + (0, ms_1.default)(tokenExpiresIn);
        const [token, refreshToken] = await Promise.all([
            await this.jwtService.signAsync({
                id: data.id,
                role: data.role,
                sessionId: data.sessionId,
            }, {
                secret: this.configService.getOrThrow('auth.secret', { infer: true }),
                expiresIn: tokenExpiresIn,
            }),
            await this.jwtService.signAsync({
                sessionId: data.sessionId,
            }, {
                secret: this.configService.getOrThrow('auth.refreshSecret', {
                    infer: true,
                }),
                expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
                    infer: true,
                }),
            }),
        ]);
        return {
            token,
            refreshToken,
            tokenExpires,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService,
        session_service_1.SessionService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map