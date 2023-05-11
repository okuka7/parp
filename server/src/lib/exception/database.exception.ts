import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export class DatabaseException extends Error {
  constructor(message: string) {
    super(message);
  }

  public static Prisma(
    error: PrismaClientKnownRequestError,
  ): DatabaseException {
    return new DatabaseException(error.message);
  }

  public static NotFound(entity?: string): DatabaseException {
    return new DatabaseException(
      `${entity ? `${entity} ` : ''}not found in database`,
    );
  }
}
