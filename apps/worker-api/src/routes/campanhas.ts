import { Hono } from 'hono';
import type { Env } from '../db';

interface Campanha {
  id: number;
  nome: string;
  canal: string;
  investimento: number;
  receita: number;
  roas: number;
  roi: number;
}

const MOCK_CAMPANHAS: Campanha[] = [
  { id: 1, nome: 'Meta Ads - Lançamento', canal: 'Meta Ads', investimento: 5000, receita: 25000, roas: 5.0, roi: 400 },
  { id: 2, nome: 'Google Ads - Pesquisa', canal: 'Google Ads', investimento: 3000, receita: 18000, roas: 6.0, roi: 500 },
  { id: 3, nome: 'Meta Ads - Retargeting', canal: 'Meta Ads', investimento: 2000, receita: 14000, roas: 7.0, roi: 600 },
  { id: 4, nome: 'Google Ads - Display', canal: 'Google Ads', investimento: 1500, receita: 4500, roas: 3.0, roi: 200 },
  { id: 5, nome: 'LinkedIn Ads', canal: 'LinkedIn Ads', investimento: 2500, receita: 7500, roas: 3.0, roi: 200 },
];

export const handleCampanhas = new Hono<{ Bindings: Env }>();

handleCampanhas.get('/', (c) => {
  return c.json(MOCK_CAMPANHAS);
});

handleCampanhas.get('/:id', (c) => {
  const id = Number(c.req.param('id'));
  const campanha = MOCK_CAMPANHAS.find(c => c.id === id);
  if (!campanha) return c.json({ error: 'Campanha não encontrada' }, 404);
  return c.json(campanha);
});

handleCampanhas.post('/', async (c) => {
  const body = await c.req.json<Omit<Campanha, 'id' | 'roas' | 'roi'>>();
  const nova: Campanha = {
    id: MOCK_CAMPANHAS.length + 1,
    nome: body.nome,
    canal: body.canal,
    investimento: body.investimento,
    receita: body.receita,
    roas: body.receita / body.investimento,
    roi: ((body.receita - body.investimento) / body.investimento) * 100,
  };
  MOCK_CAMPANHAS.push(nova);
  return c.json(nova, 201);
});

handleCampanhas.put('/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const idx = MOCK_CAMPANHAS.findIndex(c => c.id === id);
  if (idx === -1) return c.json({ error: 'Campanha não encontrada' }, 404);
  const body = await c.req.json<Partial<Campanha>>();
  const atual = MOCK_CAMPANHAS[idx];
  const updated: Campanha = {
    ...atual,
    ...body,
    roas: (body.receita ?? atual.receita) / (body.investimento ?? atual.investimento),
    roi: (((body.receita ?? atual.receita) - (body.investimento ?? atual.investimento)) / (body.investimento ?? atual.investimento)) * 100,
  };
  MOCK_CAMPANHAS[idx] = updated;
  return c.json(updated);
});

handleCampanhas.delete('/:id', (c) => {
  const id = Number(c.req.param('id'));
  const idx = MOCK_CAMPANHAS.findIndex(c => c.id === id);
  if (idx === -1) return c.json({ error: 'Campanha não encontrada' }, 404);
  MOCK_CAMPANHAS.splice(idx, 1);
  return c.json({ message: 'Campanha removida' });
});
