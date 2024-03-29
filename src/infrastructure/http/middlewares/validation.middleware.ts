import { z } from 'zod';
import { ValidationError } from '../errors/validation.error.js';
import { Middleware } from 'koa';
import { ParsedUrlQuery } from 'querystring';
import { HandlerValidation } from '../utils/create-route-handler.js';

const parse = (schema: z.ZodSchema, data: unknown, section?: string) => {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    throw new ValidationError(parsed.error, section);
  }

  return parsed.data as unknown;
};

export const validationMiddleware =
  (validation: HandlerValidation): Middleware<object, { request: { params: unknown } }> =>
  async ({ request, response }, next) => {
    if (validation.params) {
      request.params = parse(validation.params, request.params, 'params');
    }

    if (validation.query) {
      const query = parse(validation.query, request.query, 'query') as ParsedUrlQuery;
      request.query = Object.create(null) as ParsedUrlQuery;
      Object.entries(query).forEach(([key, value]) => {
        request.query[key] = value;
      });
    }

    if (validation.body) {
      request.body = parse(validation.body, request.body, 'body');
    }

    await next();

    if (validation.response) {
      response.body = parse(validation.response, response.body, 'response');
    }
  };
