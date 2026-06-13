import { Hono } from 'hono';
import { handleOtimizar } from './routes/otimizar';
import { handleCampanhas } from './routes/campanhas';
import { handleRoi } from './routes/roi';
import { runMigrations } from './migrate';
import type { Env } from './db';

const app = new Hono<{ Bindings: Env }>();

app.route('/api/otimizar', handleOtimizar);
app.route('/api/campanhas', handleCampanhas);
app.route('/api/roi', handleRoi);

app.get('/api/health', (c) => c.json({ status: 'ok' }));

app.post('/api/migrate', async (c) => {
  try {
    await runMigrations(c.env);
    return c.json({ message: 'Migrações executadas com sucesso' });
  } catch (e) {
    return c.json({ erro: String(e) }, 500);
  }
});

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return app.fetch(request, env, ctx);
  },
};