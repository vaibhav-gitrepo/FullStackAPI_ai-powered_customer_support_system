import { Context, Next } from 'hono';

export async function errorHandler(c: Context, next: Next) {
  try {
    await next();
  } catch (err: any) {
    console.error(err);
    return c.json({ error: err.message }, 500);
  }
}
