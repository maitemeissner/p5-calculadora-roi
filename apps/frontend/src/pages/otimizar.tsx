import { useState } from 'react';
import type { NextPage } from 'next';

interface Alocacao {
  campanha: string;
  valor_alocado: number;
  roas_esperado: number;
}

const Otimizar: NextPage = () => {
  const [budget, setBudget] = useState('');
  const [resultado, setResultado] = useState<Alocacao[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOtimizar = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/otimizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ budget: parseFloat(budget) }),
      });
      const data = await res.json();
      setResultado(data.alocacao);
    } finally {
      setLoading(false);
    }
  };

  const totalAlocado = resultado?.reduce((s, a) => s + a.valor_alocado, 0) ?? 0;

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>Otimização de Budget</h1>
      <p>Informe o valor total disponível para alocar entre as campanhas:</p>
      <input
        type="number"
        value={budget}
        onChange={e => setBudget(e.target.value)}
        placeholder="R$ 0,00"
        style={{ padding: '0.5rem', fontSize: '1rem', marginRight: '0.5rem' }}
      />
      <button onClick={handleOtimizar} disabled={loading} style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
        {loading ? 'Calculando...' : 'Otimizar'}
      </button>
      {resultado && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Alocação Recomendada</h2>
          <table border={1} cellPadding={8} style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>Campanha</th>
                <th>Valor Alocado</th>
                <th>ROAS Esperado</th>
              </tr>
            </thead>
            <tbody>
              {resultado.map(a => (
                <tr key={a.campanha}>
                  <td>{a.campanha}</td>
                  <td>R$ {a.valor_alocado.toFixed(2)}</td>
                  <td>{a.roas_esperado.toFixed(2)}x</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p><strong>Total alocado:</strong> R$ {totalAlocado.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default Otimizar;
