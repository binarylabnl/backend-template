import { z } from 'zod';
import { ParseInputError } from '../errors/parse-input.error.js';

export const parseInput = <T extends object>(schema: z.ZodSchema<T>, data: unknown) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new ParseInputError(result.error);
  }

  return result.data;
};