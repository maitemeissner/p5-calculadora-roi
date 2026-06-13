import { useState, useEffect } from 'react';

export default function Home() {
  const [campanhas, setCampanhas] = useState<any[]>([]);
  const [budget, setBudget] = useState('5000');
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    fetch('/api/campanhas').then(r => r.json()).then(d => setCampanhas(d.campanhas || [])).catch(() => {});
  }, []);

  const otimizar = async () => {
    const res = await fetch('/api/otimizar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ budget: parseFloat(budget), campanhas }),
    });
    setResultado(await res.json());
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: 700, margin: '0 auto' }}>
      <h1>Calculadora ROI + Otimização de Budget</h1>

      <h2>Campanhas</h2>
      <table border={1} cellPadding={6} style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead><tr><th>Nome</th><th>Plataforma</th><th>ROAS</th><th>Investimento</th></tr></thead>
        <tbody>
          {campanhas.map((c: any, i: number) => (
            <tr key={i}><td>{c.nome}</td><td>{c.plataforma}</td><td>{c.roas}x</td><td>R$ {c.investimento}</td></tr>
          ))}
        </tbody>
      </table>

      <h2>Simulador de Alocação</h2>
      <label>Budget total (R$): <input value={budget} onChange={e => setBudget(e.target.value)} /></label>
      <button onClick={otimizar} style={{ marginLeft: '0.5rem' }}>Otimizar</button>

      {resultado && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#e9ecef' }}>
          <h3>Alocação Recomendada</h3>
          <p>ROAS Estimado: <strong>{resultado.roas_estimado}x</strong></p>
          <ul>
            {resultado.alocacao?.map((a: any, i: number) => (
              <li key={i}>{a.campanha}: R$ {a.alocado?.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}