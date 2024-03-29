import { z } from 'zod';

export class ParseInputError extends Error {
  name = 'Parse input';

  constructor(readonly zodError: z.ZodError) {
    super();
  }
}
