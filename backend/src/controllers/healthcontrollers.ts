import { Hono } from 'hono';
export const healthController = new Hono();
healthController.get('/', (c) => c.json({ status: 'ok' }));
