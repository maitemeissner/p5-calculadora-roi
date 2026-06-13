export default {
  async scheduled(event: any, env: any, ctx: any) {
    console.log(`Cron triggered: ${event.cron}`);

    const mockData = [
      { nome: 'Meta Ads Q2', plataforma: 'Meta Ads', investimento: 6000, roas: 3.8, status: 'ativa' },
      { nome: 'Google Search', plataforma: 'Google Ads', investimento: 3500, roas: 3.1, status: 'ativa' },
    ];

    for (const c of mockData) {
      await env.DB.prepare(
        'INSERT OR REPLACE INTO campanhas (nome, plataforma, investimento, roas, status) VALUES (?, ?, ?, ?, ?)'
      ).bind(c.nome, c.plataforma, c.investimento, c.roas, c.status).run();
    }

    console.log('Dados de campanhas atualizados pelo cron.');
  },
};