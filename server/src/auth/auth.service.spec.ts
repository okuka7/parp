import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { PasswordRepository } from './password.repository';
import { UserRepository } from './user.repository';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PasswordRepository,
          useValue: jest.fn(),
        },
        {
          provide: UserRepository,
          useValue: jest.fn(),
        },
        {
          provide: AuthRepository,
          useValue: jest.fn(),
        },
        {
          provide: EventEmitter2,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
