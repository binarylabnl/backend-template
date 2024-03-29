import { z } from 'zod';

export class ValidationError extends Error {
  name = 'Validation';

  constructor(readonly zodError: z.ZodError, readonly section?: string) {
    super();
  }
}
