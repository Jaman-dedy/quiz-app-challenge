"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const path_1 = __importDefault(require("path"));
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const database_config_1 = __importDefault(require("./database/config/database.config"));
const auth_config_1 = __importDefault(require("./auth/config/auth.config"));
const app_config_1 = __importDefault(require("./config/app.config"));
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const i18n_module_1 = require("nestjs-i18n/dist/i18n.module");
const nestjs_i18n_1 = require("nestjs-i18n");
const typeorm_config_service_1 = require("./database/typeorm-config.service");
const home_module_1 = require("./home/home.module");
const typeorm_2 = require("typeorm");
const session_module_1 = require("./session/session.module");
const quiz_module_1 = require("./quizz/quiz.module");
const questions_module_1 = require("./questions/questions.module");
const options_module_1 = require("./options/options.module");
const participant_module_1 = require("./participant/participant.module");
const answer_module_1 = require("./answer/answer.module");
const nats_config_ts_1 = require("./common/nats-config.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [
                    database_config_1.default,
                    auth_config_1.default,
                    app_config_1.default,
                ],
                envFilePath: ['.env'],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useClass: typeorm_config_service_1.TypeOrmConfigService,
                dataSourceFactory: async (options) => {
                    return new typeorm_2.DataSource(options).initialize();
                },
            }),
            i18n_module_1.I18nModule.forRootAsync({
                useFactory: (configService) => ({
                    fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
                        infer: true,
                    }),
                    loaderOptions: { path: path_1.default.join(__dirname, '/i18n/'), watch: true },
                }),
                resolvers: [
                    {
                        use: nestjs_i18n_1.HeaderResolver,
                        useFactory: (configService) => {
                            return [
                                configService.get('app.headerLanguage', {
                                    infer: true,
                                }),
                            ];
                        },
                        inject: [config_1.ConfigService],
                    },
                ],
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
            }),
            nats_config_ts_1.natsStreamingTransport,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            session_module_1.SessionModule,
            home_module_1.HomeModule,
            quiz_module_1.QuizModule,
            questions_module_1.QuestionModule,
            options_module_1.OptionModule,
            participant_module_1.ParticipantModule,
            answer_module_1.AnswerModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map