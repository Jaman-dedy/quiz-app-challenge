import {UserEntity} from '../../src/users/entities/user.entity'
import {Session} from '../../src/session/entities/session.entity'
import { getRepositoryToken } from '@nestjs/typeorm';


export const mockUserRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

export const mockSessionRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

export const getMockUserRepository = () => ({
  provide: getRepositoryToken(UserEntity),
  useValue: mockUserRepository,
});

export const getMockSessionRepository = () => ({
  provide: getRepositoryToken(Session),
  useValue: mockSessionRepository,
});
