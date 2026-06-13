-- Schema for Cloudflare D1 database (p5-roi)
CREATE TABLE IF NOT EXISTS campanhas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  plataforma TEXT NOT NULL,
  investimento REAL NOT NULL,
  roas REAL NOT NULL,
  status TEXT DEFAULT 'ativa',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS metricas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  data TEXT,
  roas_medio REAL,
  total_investimento REAL,
  total_conversoes INTEGER
);