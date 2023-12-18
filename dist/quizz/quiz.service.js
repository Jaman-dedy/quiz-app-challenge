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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nestjs_nats_streaming_transport_1 = require("@nestjs-plugins/nestjs-nats-streaming-transport");
const quiz_entity_1 = require("./entities/quiz.entity");
const questions_entity_1 = require("../questions/entities/questions.entity");
const options_entity_1 = require("../options/entities/options.entity");
const participant_entity_1 = require("../participant/entities/participant.entity");
const user_entity_1 = require("../users/entities/user.entity");
const roles_enum_1 = require("../roles/roles.enum");
const quiz_enum_1 = require("./quiz.enum");
const events_enum_1 = require("../contants/events.enum");
let QuizService = class QuizService {
    constructor(quizRepository, participantRepository, userRepository, publisher) {
        this.quizRepository = quizRepository;
        this.participantRepository = participantRepository;
        this.userRepository = userRepository;
        this.publisher = publisher;
    }
    async createAllQuiz(createQuizDto, userId, streakBonus = 5) {
        const { title, questions } = createQuizDto;
        const quiz = this.quizRepository.create({
            title,
            status: quiz_enum_1.QuizStatus.ONGOING,
            startTime: new Date(),
            endTime: new Date(Date.now() + 3600 * 1000),
            user: userId,
            streakBonus,
        });
        return this.quizRepository.manager.transaction(async (transactionalEntityManager) => {
            const savedQuiz = await transactionalEntityManager.save(quiz);
            const savedQuestions = await Promise.all(questions.map(async (questionDto) => {
                const { text, options } = questionDto;
                const question = transactionalEntityManager.create(questions_entity_1.QuestionEntity, { text, quiz: savedQuiz });
                const savedQuestion = await transactionalEntityManager.save(question);
                const savedOptions = await Promise.all(options.map((optionDto) => {
                    const option = transactionalEntityManager.create(options_entity_1.OptionEntity, Object.assign(Object.assign({}, optionDto), { question: savedQuestion }));
                    return transactionalEntityManager.save(option);
                }));
                savedQuestion.options = savedOptions;
                return savedQuestion;
            }));
            savedQuiz.questions = savedQuestions;
            const creatorUser = await this.userRepository.findOne({ where: { id: userId } });
            if (!creatorUser) {
                throw new common_1.NotFoundException(`User with ID ${userId} not found.`);
            }
            creatorUser.role = roles_enum_1.RoleEnum.creator;
            await this.userRepository.save(creatorUser);
            this.publisher.emit(events_enum_1.Patterns.quizCreated, { quiz: savedQuiz.id, user: creatorUser.username }).subscribe(guid => {
                console.log(`*** Published quiz : ${savedQuiz.id},  Creator: ${creatorUser.username} ***`);
            });
            return { quizID: savedQuiz.id, confirmation: "Quiz created successfully" };
        });
    }
    async getAvailableQuizzes() {
        const currentDate = new Date();
        const quizzes = await this.quizRepository.find({
            where: {
                status: (0, typeorm_2.In)([quiz_enum_1.QuizStatus.UPCOMING, quiz_enum_1.QuizStatus.ONGOING]),
                startTime: (0, typeorm_2.LessThanOrEqual)(currentDate),
                endTime: (0, typeorm_2.MoreThanOrEqual)(currentDate),
            },
        });
        if (quizzes.length === 0) {
            return { message: 'No available quiz at the moment.' };
        }
        return quizzes;
    }
    async getQuizWithDetails(quizId) {
        const quiz = await this.quizRepository
            .createQueryBuilder('quiz')
            .leftJoinAndSelect('quiz.questions', 'questions')
            .leftJoinAndSelect('questions.options', 'options')
            .where('quiz.id = :quizId', { quizId })
            .getOne();
        if (!quiz) {
            throw new common_1.NotFoundException(`Quiz with ID ${quizId} not found`);
        }
        return quiz;
    }
    async getParticipantScoresInQuiz(participantId, quizId) {
        const participant = await this.participantRepository.findOne({
            where: { user: { id: participantId } },
            relations: ['answers', 'answers.options', 'answers.question', 'answers.question.quiz'],
        });
        if (!participant) {
            return { currentScore: 0, streakScore: 0 };
        }
        const quizAnswers = participant.answers.filter(answer => answer.question && answer.question.quiz && answer.question.quiz.id === quizId);
        const scores = quizAnswers.reduce((result, answer) => {
            const answerScore = answer.score || 0;
            const isCorrect = answer.options.some(option => option.isCorrect);
            const streakBonus = isCorrect ? (answer.question.quiz.streakBonus || 0) : 0;
            participant.streak = isCorrect ? participant.streak + 1 : 0;
            const currentAnswerBonus = isCorrect ? participant.streak * streakBonus : 0;
            const totalAnswerScore = answerScore + currentAnswerBonus;
            result.currentScore += answerScore;
            result.streakScore += totalAnswerScore;
            return result;
        }, { currentScore: 0, streakScore: 0 });
        return scores;
    }
    async getLeaderboard() {
        const leaderboard = await this.participantRepository
            .createQueryBuilder('participant')
            .leftJoinAndSelect('participant.answers', 'answer')
            .leftJoinAndSelect('participant.user', 'user')
            .leftJoinAndSelect('answer.question', 'question')
            .getMany();
        const groupedLeaderboard = leaderboard.reduce((acc, participant) => {
            const participantId = participant.id;
            const username = participant.user.username ? participant.user.username : 'Unknown';
            if (!acc[participantId]) {
                acc[participantId] = { participantId, username, score: 0 };
            }
            acc[participantId].score += participant.answers.reduce((sum, answer) => sum + (answer.score || 0), 0);
            return acc;
        }, {});
        const leaderboardDto = Object.values(groupedLeaderboard);
        leaderboardDto.sort((a, b) => b.score - a.score);
        if (leaderboardDto.length === 0) {
            return { message: "No data available for now" };
        }
        return leaderboardDto;
    }
    async updateQuizStatus() {
        const currentDate = new Date();
        const quizzesToUpdate = await this.quizRepository.find({
            where: {
                status: quiz_enum_1.QuizStatus.UPCOMING,
                startTime: (0, typeorm_2.LessThanOrEqual)(currentDate),
            },
        });
        await Promise.all(quizzesToUpdate.map(async (quiz) => {
            quiz.status = quiz_enum_1.QuizStatus.ONGOING;
            await this.quizRepository.save(quiz);
        }));
        const completedQuizzes = await this.quizRepository.find({
            where: {
                status: quiz_enum_1.QuizStatus.ONGOING,
                endTime: (0, typeorm_2.LessThanOrEqual)(currentDate),
            },
        });
        await Promise.all(completedQuizzes.map(async (quiz) => {
            quiz.status = quiz_enum_1.QuizStatus.COMPLETED;
            await this.quizRepository.save(quiz);
        }));
    }
    update(id, payload) {
        return this.quizRepository.save(this.quizRepository.create(Object.assign({ id }, payload)));
    }
};
exports.QuizService = QuizService;
exports.QuizService = QuizService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quiz_entity_1.QuizEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(participant_entity_1.ParticipantEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        nestjs_nats_streaming_transport_1.Publisher])
], QuizService);
//# sourceMappingURL=quiz.service.js.map