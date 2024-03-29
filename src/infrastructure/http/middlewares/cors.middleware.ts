import cors from '@koa/cors';
import { Middleware } from 'koa';

export const corsMiddleware = (): Middleware => cors({ credentials: true });
