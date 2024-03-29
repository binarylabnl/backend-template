export class BadRequestError extends Error {
  name = 'Bad request';

  constructor(readonly message: string) {
    super();
  }
}
