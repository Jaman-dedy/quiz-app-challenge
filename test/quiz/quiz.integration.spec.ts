import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';

describe('QuizController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/POST joinQuiz', async () => {

    const createParticipantDto = {
      userId: 'testUserId',
      quizId: 'testQuizId',
    };
    const response = await request(app.getHttpServer())
      .post(`/api/v1/quizzes/1/participate`)
      .send(createParticipantDto)
      .expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
