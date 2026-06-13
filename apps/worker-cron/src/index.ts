export interface Env {
  DB: D1Database;
}

async function executarETL(env: Env): Promise<void> {
  const agor = new Date().toISOString();
  console.log(`[CRON] Iniciando ETL semanal em ${agor}`);

  await env.DB.prepare(`
    INSERT INTO logs_etl (tipo, status, executado_em)
    VALUES ('semanal', 'iniciado', ?)
  `).bind(agor).run();

  console.log('[CRON] ETL concluído com sucesso');
}

export default {
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(executarETL(env));
  },
};
