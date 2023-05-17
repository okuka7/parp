import { Test, TestingModule } from '@nestjs/testing';
import { BasePrismaService } from './base-prisma.service';

describe('BasePrismaService', () => {
  let service: BasePrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasePrismaService],
    }).compile();

    service = module.get<BasePrismaService>(BasePrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
