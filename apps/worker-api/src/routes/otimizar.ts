import { Hono } from 'hono';
import type { Env } from '../db';
import { otimizarBudget, type Alocacao } from '../optimizer';

interface Historico {
  id: number;
  data: string;
  budget_total: number;
  alocacao: Alocacao[];
}

const MOCK_CAMPANHAS = [
  { nome: 'Meta Ads - Lançamento', roas: 5.0 },
  { nome: 'Google Ads - Pesquisa', roas: 6.0 },
  { nome: 'Meta Ads - Retargeting', roas: 7.0 },
  { nome: 'Google Ads - Display', roas: 3.0 },
  { nome: 'LinkedIn Ads', roas: 3.0 },
];

const MOCK_HISTORICO: Historico[] = [
  {
    id: 1,
    data: '2025-01-15T10:00:00Z',
    budget_total: 15000,
    alocacao: [
      { campanha: 'Meta Ads - Lançamento', valor_alocado: 4166.67, roas_esperado: 5.0 },
      { campanha: 'Google Ads - Pesquisa', valor_alocado: 5000.00, roas_esperado: 6.0 },
      { campanha: 'Meta Ads - Retargeting', valor_alocado: 5833.33, roas_esperado: 7.0 },
      { campanha: 'Google Ads - Display', valor_alocado: 0, roas_esperado: 3.0 },
      { campanha: 'LinkedIn Ads', valor_alocado: 0, roas_esperado: 3.0 },
    ],
  },
];

let nextId = 2;

export const handleOtimizar = new Hono<{ Bindings: Env }>();

handleOtimizar.post('/', async (c) => {
  const { budget } = await c.req.json<{ budget: number }>();
  if (!budget || budget <= 0) {
    return c.json({ error: 'Budget deve ser um valor positivo' }, 400);
  }
  const alocacao = otimizarBudget(MOCK_CAMPANHAS, budget);
  const historico: Historico = {
    id: nextId++,
    data: new Date().toISOString(),
    budget_total: budget,
    alocacao,
  };
  MOCK_HISTORICO.push(historico);
  return c.json({ alocacao, id: historico.id });
});

handleOtimizar.get('/historico', (c) => {
  return c.json(MOCK_HISTORICO);
});
