import { Hono } from 'hono';
import type { Env } from './db';
import { runMigrations } from './migrate';

const app = new Hono<{ Bindings: Env }>();

app.post('/migrate', async (c) => {
  try {
    await runMigrations(c.env);
    return c.json({ message: 'Migrações executadas com sucesso' });
  } catch (e) {
    return c.json({ erro: String(e) }, 500);
  }
});

export default app;