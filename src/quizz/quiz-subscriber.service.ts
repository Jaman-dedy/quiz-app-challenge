import { Injectable } from '@nestjs/common';
import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { EventPattern } from '@nestjs/microservices';

@Injectable()
export class QuizSubscriberService {
  constructor(private publisher: Publisher) { }
  
  @EventPattern('quiz.created')
  handleQuizCreatedEvent(data: { quizId: number }) {
    // Handle quiz created event
    console.log(`Quiz with ID ++++ ${data.quizId} has been created.`);
    // You can add additional logic here to respond to the event
  }

  @EventPattern('live.participation')
  handleLiveParticipationEvent(data: { userId: number; quizId: number }) {
    // Handle live participation event
    console.log(`User with ID +++ ${data.userId} is participating in Quiz ${data.quizId}.`);
    // You can add additional logic here to respond to the event
  }

  @EventPattern('score.update')
  handleScoreUpdateEvent(data: { userId: number; quizId: number; score: number }) {
    // Handle score update event
    console.log(`User with ID +++ ${data.userId} scored ${data.score} in Quiz ${data.quizId}.`);
    // You can add additional logic here to respond to the event
  }
}
