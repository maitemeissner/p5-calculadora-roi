import { Hono } from 'hono';
import { cors } from 'hono/cors';

type Bindings = { DB: D1Database };

const app = new Hono<{ Bindings: Bindings }>();
app.use('/*', cors());

// Simple linear optimization: allocate budget proportionally to ROAS
function otimizarBudget(budget: number, campanhas: any[]) {
  if (campanhas.length === 0) return { alocacao: [], roas_estimado: 0 };

  const totalRoas = campanhas.reduce((s, c) => s + c.roas, 0);
  const alocacao = campanhas.map(c => ({
    campanha: c.nome,
    roas: c.roas,
    alocado: (c.roas / totalRoas) * budget,
  }));

  const roasEstimado = alocacao.reduce((s, a) => s + a.roas * (a.alocado / budget), 0);
  return { alocacao, roas_estimado: Math.round(roasEstimado * 100) / 100 };
}

app.get('/api/campanhas', async (c) => {
  try {
    const result = await c.env.DB.prepare('SELECT * FROM campanhas ORDER BY roas DESC').all();
    return c.json({ campanhas: result.results });
  } catch {
    // Mock data if DB not available
    return c.json({
      campanhas: [
        { nome: 'Meta Q1', plataforma: 'Meta Ads', investimento: 5000, roas: 3.5, status: 'ativa' },
        { nome: 'Google Q1', plataforma: 'Google Ads', investimento: 4000, roas: 2.8, status: 'ativa' },
        { nome: 'Retargeting', plataforma: 'Meta Ads', investimento: 3000, roas: 4.2, status: 'ativa' },
      ]
    });
  }
});

app.post('/api/otimizar', async (c) => {
  const { budget, campanhas } = await c.req.json();
  const resultado = otimizarBudget(budget || 0, campanhas || []);
  return c.json(resultado);
});

app.get('/api/roi', async (c) => {
  const result = await c.env.DB.prepare('SELECT plataforma, SUM(investimento) as total_invest, AVG(roas) as avg_roas FROM campanhas GROUP BY plataforma').all();
  return c.json({ roi: result.results });
});

export default app;