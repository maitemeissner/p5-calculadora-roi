import { useState, useEffect } from 'react';
import type { NextPage } from 'next';

interface Campanha {
  id: number;
  nome: string;
  canal: string;
  investimento: number;
  receita: number;
  roas: number;
  roi: number;
}

interface Resumo {
  canal: string;
  total_investimento: number;
  total_receita: number;
  roas_medio: number;
}

const Home: NextPage = () => {
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [resumo, setResumo] = useState<Resumo[]>([]);

  useEffect(() => {
    fetch('/api/roi/resumo')
      .then(r => r.json())
      .then(setResumo);
    fetch('/api/campanhas')
      .then(r => r.json())
      .then(setCampanhas);
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>Dashboard ROI / ROAS</h1>
      <h2>Resumo por Canal</h2>
      <table border={1} cellPadding={8} style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '2rem' }}>
        <thead>
          <tr>
            <th>Canal</th>
            <th>Investimento Total</th>
            <th>Receita Total</th>
            <th>ROAS Médio</th>
          </tr>
        </thead>
        <tbody>
          {resumo.map(r => (
            <tr key={r.canal}>
              <td>{r.canal}</td>
              <td>R$ {r.total_investimento.toFixed(2)}</td>
              <td>R$ {r.total_receita.toFixed(2)}</td>
              <td>{r.roas_medio.toFixed(2)}x</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Campanhas</h2>
      <table border={1} cellPadding={8} style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Canal</th>
            <th>Investimento</th>
            <th>Receita</th>
            <th>ROAS</th>
            <th>ROI</th>
          </tr>
        </thead>
        <tbody>
          {campanhas.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.nome}</td>
              <td>{c.canal}</td>
              <td>R$ {c.investimento.toFixed(2)}</td>
              <td>R$ {c.receita.toFixed(2)}</td>
              <td>{c.roas.toFixed(2)}x</td>
              <td>{c.roi.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
