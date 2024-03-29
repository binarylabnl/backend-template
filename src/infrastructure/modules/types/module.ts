import type Koa from 'koa';

export type Module = (app: { http: Koa }) => Promise<void> | void;
