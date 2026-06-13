import { useState, useEffect } from 'react';
import type { NextPage } from 'next';

interface AlocacaoHistorico {
  id: number;
  data: string;
  budget_total: number;
  alocacao: { campanha: string; valor_alocado: number; roas_esperado: number }[];
}

const Relatorios: NextPage = () => {
  const [historico, setHistorico] = useState<AlocacaoHistorico[]>([]);

  useEffect(() => {
    fetch('/api/otimizar/historico')
      .then(r => r.json())
      .then(setHistorico);
  }, []);

  const exportarPDF = () => {
    window.print();
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>Relatórios</h1>
      <button onClick={exportarPDF} style={{ padding: '0.5rem 1rem', fontSize: '1rem', marginBottom: '1rem' }}>
        Exportar PDF
      </button>
      {historico.map(h => (
        <div key={h.id} style={{ marginBottom: '2rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '4px' }}>
          <h2>Alocação #{h.id} - {new Date(h.data).toLocaleDateString('pt-BR')}</h2>
          <p><strong>Budget Total:</strong> R$ {h.budget_total.toFixed(2)}</p>
          <table border={1} cellPadding={8} style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>Campanha</th>
                <th>Valor Alocado</th>
                <th>ROAS Esperado</th>
              </tr>
            </thead>
            <tbody>
              {h.alocacao.map(a => (
                <tr key={a.campanha}>
                  <td>{a.campanha}</td>
                  <td>R$ {a.valor_alocado.toFixed(2)}</td>
                  <td>{a.roas_esperado.toFixed(2)}x</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Relatorios;
