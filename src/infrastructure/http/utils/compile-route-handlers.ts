import Router from '@koa/router';
import { Handler } from './create-route-handler.js';

export const compileRouteHandlers = (handlers: Handler[]) => {
  const router = new Router();

  handlers.forEach((handler) => {
    router.register(handler.path, Array.isArray(handler.method) ? handler.method : [handler.method], handler.chain);
  });

  return router;
};
