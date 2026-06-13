CREATE TABLE IF NOT EXISTS campanhas (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  plataforma TEXT NOT NULL,
  investimento REAL NOT NULL,
  impressoes INTEGER DEFAULT 0,
  cliques INTEGER DEFAULT 0,
  conversoes INTEGER DEFAULT 0,
  receita REAL DEFAULT 0,
  status TEXT DEFAULT 'Ativa',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS alocacoes (
  id TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  budget_total REAL NOT NULL,
  resultados TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS alertas (
  id TEXT PRIMARY KEY,
  campanha_id TEXT,
  metric TEXT NOT NULL,
  valor REAL NOT NULL,
  threshold REAL NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);