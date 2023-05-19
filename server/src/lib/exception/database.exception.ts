export class DatabaseException extends Error {
  constructor(message: string) {
    super(message);
  }

  public static NotFound(entity?: string): DatabaseException {
    return new DatabaseException(
      `${entity ? `${entity} ` : ''}not found in database`,
    );
  }
}
