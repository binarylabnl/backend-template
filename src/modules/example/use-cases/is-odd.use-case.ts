import { z } from 'zod';
import { parseInput } from '../../../infrastructure/use-cases/utils/parse-input.js';

const inputSchema = z.object({
  value: z.number(),
});

export const isOddUseCase = (input: z.input<typeof inputSchema>) => {
  const { value } = parseInput(inputSchema, input);

  return { isOdd: value % 2 === 1 };
};
