import { z } from 'zod';
import { createRouteHandler } from '../../../../infrastructure/http/utils/create-route-handler.js';
import { isOddUseCase } from '../../use-cases/is-odd.use-case.js';

export const isOddHandler = createRouteHandler({
  method: 'POST',
  path: '/v1/example/is-odd',
  validation: {
    body: z.object({
      value: z.number(),
    }),
    response: z.boolean(),
  },
  handler: ({ request, response }) => {
    const result = isOddUseCase({
      value: request.body.value,
    });

    response.body = result.isOdd;
    response.status = 200;
  },
});
