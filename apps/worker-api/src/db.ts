export interface Env {
  DB: D1Database;
}

export async function query(env: Env, sql: string, params: unknown[] = []): Promise<unknown[]> {
  const stmt = env.DB.prepare(sql);
  const result = await stmt.bind(...params).all();
  return result.results;
}

export async function queryOne(env: Env, sql: string, params: unknown[] = []): Promise<unknown | null> {
  const stmt = env.DB.prepare(sql);
  const result = await stmt.bind(...params).first();
  return result ?? null;
}
