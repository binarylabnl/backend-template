import { compileRouteHandlers } from '../../../infrastructure/http/utils/compile-route-handlers.js';
import { isOddHandler } from './handlers/is-odd.handler.js';

export const routes = compileRouteHandlers([isOddHandler]);
