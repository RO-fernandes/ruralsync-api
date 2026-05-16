import { useState, useEffect } from 'react';

interface IFazendaLayout {
  id?: number;
  name: string;
  contract_type: string;
  area: number;
  cattleCount: number;
  cidade: string;
  estado: string;
  status: 'bom' | 'alerta' | 'critico';
}

export default function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes letreiroMover {
        0% { transform: translate3d(0, 0, 0); }
        100% { transform: translate3d(-50%, 0, 0); }
      }
      @keyframes piscar {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
      .ticker-container { overflow: hidden; white-space: nowrap; width: 100%; display: flex; align-items: center; }
      .ticker-wrapper { display: inline-block; animation: letreiroMover 45s linear infinite; }
      .ticker-item { display: inline-block; padding: 0 30px; font-size: 13px; font-weight: 600; color: #cbd5e1; letter-spacing: 0.5px; }
      .ticker-green { color: #4ade80; font-weight: 700; }
      .ticker-red { color: #f87171; font-weight: 700; }
      .live-badge { animation: piscar 2s infinite; font-size: 10px; background: #2ecc71; color: #fff; padding: 3px 8px; border-radius: 4px; font-weight: 900; margin-right: 15px; letter-spacing: 1px; }
      .ad-badge { font-size: 11px; background: #f59e0b; color: #1e293b; padding: 2px 6px; border-radius: 4px; font-weight: 800; margin-right: 6px; }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);

  const [fazendas] = useState<IFazendaLayout[]>([
    { name: "Fazenda Progresso", contract_type: "Própria", area: 1006, cattleCount: 517, cidade: "Rondonópolis", estado: "MT", status: 'bom' },
    { name: "Arranjo Silva", contract_type: "Arrendada", area: 1564, cattleCount: 257, cidade: "Dourados", estado: "MS", status: 'bom' },
    { name: "Sítio Novo", contract_type: "Própria", area: 1037, cattleCount: 194, cidade: "Uberlândia", estado: "MG", status: 'alerta' },
    { name: "Fazenda Boa Vista", contract_type: "Arrendada", area: 1035, cattleCount: 161, cidade: "Rio Verde", estado: "GO", status: 'bom' },
    { name: "Fazenda Santa Fé", contract_type: "Própria", area: 800, cattleCount: 150, cidade: "Cascavel", estado: "PR", status: 'critico' },
  ]);

  const [busca, setBusca] = useState('');
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const fazendasFiltradas = fazendas.filter(f =>
    f.name.toUpperCase().includes(busca.toUpperCase()) ||
    f.contract_type.toUpperCase().includes(busca.toUpperCase())
  );

  const totalUnidades = fazendas.length.toString().padStart(2, '0');
  const totalGado = fazendas.reduce((acc, f) => acc + f.cattleCount, 0).toLocaleString('pt-BR');
  const totalArea = fazendas.reduce((acc, f) => acc + f.area, 0).toLocaleString('pt-BR');

  const renderTickerContent = () => (
    <>
      <span className="ticker-item">🐂 BOI GORDO (CEPEA/SP): R$ 282,50 <span className="ticker-green">▲ 0.45%</span></span>
      <span className="ticker-item">|</span>
      <span className="ticker-item">🌾 SOJA (PARANAGUÁ): R$ 138,20 <span className="ticker-red">▼ 0.12%</span></span>
      <span className="ticker-item">|</span>
      <span className="ticker-item">🌽 MILHO (BM&F): R$ 64,10 <span className="ticker-green">▲ 1.20%</span></span>
      <span className="ticker-item">|</span>
      <span className="ticker-item" style={{ color: '#fef08a' }}><span className="ad-badge">📢 ANÚNCIO</span> NUTRIÇÃO PREMIUM: PREÇOS DIRETO DA FÁBRICA! LIGUE (66) 9999-9999</span>
      <span className="ticker-item">|</span>
      <span className="ticker-item">🐄 VACA GORDA (MT): R$ 255,00 <span className="ticker-green">▲ 0.30%</span></span>
      <span className="ticker-item">|</span>
    </>
  );

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', maxWidth: '100%', backgroundColor: '#f8fafc', overflow: 'hidden', margin: 0, padding: 0, boxSizing: 'border-box' }}>
      
      {/* 🟢 1. SIDEBAR */}
      <nav style={{ width: '190px', backgroundColor: '#0f291b', padding: '24px 12px', flexShrink: 0, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
        <div style={{ color: '#4ade80', fontWeight: 900, fontSize: '20px', letterSpacing: '3px', textAlign: 'center', marginBottom: '35px' }}>
          RURAL<span style={{ color: '#fff' }}>SYNC</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', padding: '12px 14px', borderRadius: '10px', color: '#ffffff', textDecoration: 'none', fontWeight: 600, fontSize: '14px', backgroundColor: '#1e4631', boxSizing: 'border-box' }}>
            <i className="fas fa-chart-pie" style={{ width: '20px', fontSize: '16px', marginRight: '10px', color: '#4ade80' }}></i> Painel Geral
          </a>
          
          <div>
            <div onClick={() => setSubmenuOpen(!submenuOpen)} style={{ display: 'flex', alignItems: 'center', padding: '12px 14px', borderRadius: '10px', color: '#94a3b8', textDecoration: 'none', fontWeight: 600, fontSize: '14px', cursor: 'pointer', boxSizing: 'border-box' }}>
              <i className="fas fa-map-marked-alt" style={{ width: '20px', fontSize: '16px', marginRight: '10px' }}></i> Propriedades
              <i className="fas fa-chevron-right" style={{ fontSize: '10px', marginLeft: 'auto', transform: submenuOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: '0.2s' }}></i>
            </div>
            
            {submenuOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '25px', marginTop: '4px', gap: '6px' }}>
                <a href="#" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 500 }}>• Listar Fazendas</a>
                <a href="#" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 500 }}>• Adicionar Nova</a>
              </div>
            )}
          </div>
          
          <a href="#" style={{ display: 'flex', alignItems: 'center', padding: '12px 14px', borderRadius: '10px', color: '#94a3b8', textDecoration: 'none', fontWeight: 600, fontSize: '14px', boxSizing: 'border-box' }}>
            <i className="fas fa-cow" style={{ width: '20px', fontSize: '16px', marginRight: '10px' }}></i> Rebanho
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', padding: '12px 14px', borderRadius: '10px', color: '#94a3b8', textDecoration: 'none', fontWeight: 600, fontSize: '14px', boxSizing: 'border-box' }}>
            <i className="fas fa-heartbeat" style={{ width: '20px', fontSize: '16px', marginRight: '10px' }}></i> Sanidade
          </a>
        </div>
      </nav>

      {/* 🖥️ 2. ÁREA DO CONTEÚDO PRINCIPAL */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
        
        {/* TOPO PREMIUM (Letreiro) */}
        <header style={{ height: '50px', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', padding: '0 0 0 15px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', zIndex: 20, boxSizing: 'border-box' }}>
          <span className="live-badge"><i className="fas fa-circle" style={{ fontSize: '7px', marginRight: '4px', verticalAlign: 'middle' }}></i>AO VIVO</span>
          <div className="ticker-container">
            <div className="ticker-wrapper">
              {renderTickerContent()}
              {renderTickerContent()}
            </div>
          </div>
          <div style={{ backgroundColor: '#111827', height: '100%', padding: '0 25px', display: 'flex', alignItems: 'center', gap: '10px', borderLeft: '1px solid #334155', zIndex: 30 }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', whiteSpace: 'nowrap' }}>JD</span>
            <div style={{ width: '30px', height: '30px', borderRadius: '6px', backgroundColor: '#2ecc71', color: '#0f291b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>PA</div>
          </div>
        </header>

        {/* 🔑 CORPO DA DASHBOARD - Injetado padding lateral de 40px rígido direto na div principal */}
        <main style={{ flex: 1, padding: '20px 40px', overflowY: 'auto', overflowX: 'hidden', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
          
          <div style={{ marginBottom: '15px' }}>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#0f172a' }}>Painel de Controle Geral 📊</h1>
          </div>

          {/* 📊 CARDS EM GRID - Largura automática ajustada pelo padding global */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px', boxSizing: 'border-box', minWidth: 0 }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                <i className="fas fa-warehouse"></i>
              </div>
              <div style={{ minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Propriedades</span>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#1e293b', whiteSpace: 'nowrap' }}>{totalUnidades} <span style={{ fontSize: '12px', fontWeight: 500, color: '#64748b' }}>Ativas</span></h2>
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px', boxSizing: 'border-box', minWidth: 0 }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                <i className="fas fa-mountain"></i>
              </div>
              <div style={{ minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Área Mapeada</span>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#1e293b', whiteSpace: 'nowrap' }}>{totalArea} <span style={{ fontSize: '12px', fontWeight: 500, color: '#64748b' }}>ha</span></h2>
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px', boxSizing: 'border-box', minWidth: 0 }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#fff7ed', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                <i className="fas fa-cloud-download-alt"></i>
              </div>
              <div style={{ minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Efetivo Gado</span>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#1e293b', whiteSpace: 'nowrap' }}>{totalGado} <span style={{ fontSize: '12px', fontWeight: 500, color: '#64748b' }}>Cab.</span></h2>
              </div>
            </div>
          </div>

          {/* 📋 SEÇÃO DA TABELA - Largura automática e recuada pelo padding do main */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, width: '100%', boxSizing: 'border-box' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Listagem de Fazendas</h3>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <i className="fas fa-search" style={{ position: 'absolute', left: '12px', color: '#94a3b8', fontSize: '13px' }}></i>
                <input 
                  type="text" 
                  placeholder="Pesquisar..." 
                  value={busca} 
                  onChange={e => setBusca(e.target.value)} 
                  style={{ padding: '6px 12px 6px 32px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', width: '180px', outline: 'none' }} 
                />
              </div>
            </div>

            <div style={{ overflowY: 'auto', overflowX: 'hidden', flex: 1, padding: '0 24px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #edf2f7' }}>
                    <th style={{ width: '35%', textAlign: 'left', padding: '14px 0', color: '#475569', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>Nome da Propriedade</th>
                    <th style={{ width: '20%', textAlign: 'left', padding: '14px 0', color: '#475569', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>Regime de Contrato</th>
                    <th style={{ width: '15%', textAlign: 'right', padding: '14px 0', color: '#475569', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>Área Utilizável</th>
                    <th style={{ width: '15%', textAlign: 'right', padding: '14px 0', color: '#475569', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>Total Animais</th>
                    <th style={{ width: '15%', textAlign: 'center', padding: '14px 0', color: '#475569', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>Manejo/Status</th>
                  </tr>
                </thead>
                <tbody>
                  {fazendasFiltradas.map((f, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '14px 0', fontSize: '14px', color: '#0f172a', fontWeight: 600, verticalAlign: 'middle', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                          <span style={{ display: 'block' }}>{f.name}</span>
                          <span style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#64748b', marginTop: '2px' }}>
                            <i className="fas fa-map-marker-alt" style={{ color: '#10b981', marginRight: '5px', fontSize: '11px' }}></i>{f.cidade} - {f.estado}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 0', fontSize: '13px', color: '#475569', verticalAlign: 'middle' }}>
                        <span style={{ backgroundColor: f.contract_type === 'Própria' ? '#f0fdf4' : '#fff7ed', color: f.contract_type === 'Própria' ? '#16a34a' : '#ea580c', padding: '4px 10px', borderRadius: '6px', fontWeight: 600, fontSize: '12px' }}>
                          {f.contract_type}
                        </span>
                      </td>
                      <td style={{ padding: '14px 0', fontSize: '14px', color: '#334155', fontWeight: 600, textAlign: 'right', verticalAlign: 'middle' }}>{f.area.toLocaleString('pt-BR')} ha</td>
                      <td style={{ padding: '14px 0', fontSize: '14px', color: '#0f172a', fontWeight: 700, textAlign: 'right', verticalAlign: 'middle' }}>{f.cattleCount.toLocaleString('pt-BR')} <span style={{ fontSize: '12px', fontWeight: 400, color: '#64748b' }}>cab.</span></td>
                      <td style={{ padding: '14px 0', textAlign: 'center', verticalAlign: 'middle' }}>
                        <span style={{ backgroundColor: f.status === 'bom' ? '#dcfce7' : f.status === 'alerta' ? '#fef9c3' : '#fee2e2', color: f.status === 'bom' ? '#15803d' : f.status === 'alerta' ? '#a16207' : '#b91c1c', padding: '4px 12px', borderRadius: '20px', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase' }}>
                          {f.status === 'bom' ? 'Estável' : f.status === 'alerta' ? 'Atenção' : 'Crítico'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}