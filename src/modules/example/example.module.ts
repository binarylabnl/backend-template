import { Module } from '../../infrastructure/modules/types/module.js';
import { routes } from './http/routes.js';

export const exampleModule: Module = (app) => {
  app.http.use(routes.routes()).use(routes.allowedMethods());
};
