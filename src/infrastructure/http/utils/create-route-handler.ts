import { Middleware as RouterMiddleware } from '@koa/router';
import { Context, Middleware, Request } from 'koa';
import { z } from 'zod';
import { validationMiddleware } from '../middlewares/validation.middleware.js';

export type HandlerMethod = 'ALL' | 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';

export interface HandlerValidation {
  readonly params?: z.ZodSchema;
  readonly query?: z.ZodSchema;
  readonly body?: z.ZodSchema;
  readonly response?: z.ZodSchema;
}

export interface HandlerZodContext<T extends HandlerValidation> extends Context {
  request: {
    params: T['params'] extends undefined ? unknown : z.output<Exclude<T['params'], undefined>>;
    query: T['query'] extends undefined ? unknown : z.output<Exclude<T['query'], undefined>>;
    body: T['body'] extends undefined ? unknown : z.output<Exclude<T['body'], undefined>>;
  } & Request;
}

export interface HandlerOptions<T extends HandlerValidation> {
  readonly method: HandlerMethod | HandlerMethod[];
  readonly path: string | RegExp;
  readonly middlewares?: Middleware[];
  readonly validation?: T;
  readonly handler: RouterMiddleware<
    object,
    HandlerZodContext<T>,
    T['response'] extends undefined ? unknown : z.input<Exclude<T['response'], undefined>>
  >;
}

export interface Handler {
  readonly method: HandlerOptions<HandlerValidation>['method'];
  readonly path: HandlerOptions<HandlerValidation>['path'];
  readonly chain: RouterMiddleware[];
}

export const createRouteHandler = <T extends HandlerValidation>(options: HandlerOptions<T>): Handler => {
  const chain: (Middleware | RouterMiddleware)[] = [];

  if (options.middlewares) {
    chain.push(...options.middlewares);
  }

  if (options.validation) {
    chain.push(validationMiddleware(options.validation) as Middleware);
  }

  chain.push(options.handler as RouterMiddleware);

  return { method: options.method, path: options.path, chain };
};
