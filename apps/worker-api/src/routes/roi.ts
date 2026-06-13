import { Hono } from 'hono';
import type { Env } from '../db';

interface Resumo {
  canal: string;
  total_investimento: number;
  total_receita: number;
  roas_medio: number;
  roi_medio: number;
}

const MOCK_RESUMO: Resumo[] = [
  { canal: 'Meta Ads', total_investimento: 7000, total_receita: 39000, roas_medio: 5.57, roi_medio: 457 },
  { canal: 'Google Ads', total_investimento: 4500, total_receita: 22500, roas_medio: 5.0, roi_medio: 400 },
  { canal: 'LinkedIn Ads', total_investimento: 2500, total_receita: 7500, roas_medio: 3.0, roi_medio: 200 },
];

export const handleRoi = new Hono<{ Bindings: Env }>();

handleRoi.get('/resumo', (c) => {
  return c.json(MOCK_RESUMO);
});

handleRoi.get('/geral', (c) => {
  const totalInvest = MOCK_RESUMO.reduce((s, r) => s + r.total_investimento, 0);
  const totalReceita = MOCK_RESUMO.reduce((s, r) => s + r.total_receita, 0);
  const roasGeral = totalInvest > 0 ? totalReceita / totalInvest : 0;
  const roiGeral = totalInvest > 0 ? ((totalReceita - totalInvest) / totalInvest) * 100 : 0;
  return c.json({
    total_investimento: totalInvest,
    total_receita: totalReceita,
    roas_geral: roasGeral,
    roi_geral: roiGeral,
  });
});
