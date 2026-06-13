interface CampanhaROI {
  nome: string;
  roas: number;
}

export interface Alocacao {
  campanha: string;
  valor_alocado: number;
  roas_esperado: number;
}

export function otimizarBudget(campanhas: CampanhaROI[], budgetTotal: number): Alocacao[] {
  if (campanhas.length === 0) return [];

  const totalROAS = campanhas.reduce((s, c) => s + c.roas, 0);
  if (totalROAS === 0) {
    const igual = budgetTotal / campanhas.length;
    return campanhas.map(c => ({
      campanha: c.nome,
      valor_alocado: igual,
      roas_esperado: c.roas,
    }));
  }

  const proporcao = campanhas.map(c => c.roas / totalROAS);
  return campanhas.map((c, i) => ({
    campanha: c.nome,
    valor_alocado: Math.round(budgetTotal * proporcao[i] * 100) / 100,
    roas_esperado: c.roas,
  }));
}
