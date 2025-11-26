import { useEffect, useState } from "react";
import { Receipt, ShoppingBag, CreditCard, ArrowUpRight } from "lucide-react";

export default function HistoricoPedidos() {
  const [stats, setStats] = useState(null);
  const [maisVendidos, setMaisVendidos] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);
  const [vendasSemana, setVendasSemana] = useState([]);

  useEffect(() => {
    // Aguarda dados da API futuramente
    setTimeout(() => {
      setStats(null);
      setMaisVendidos([]);
      setPagamentos([]);
      setVendasSemana([]);
    }, 1200);
  }, []);

  const diasDaSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  return (
    <div className="w-full min-h-screen bg-[#F8F6F2] px-10 py-12">
      <div className="max-w-7xl mx-auto">

        {/* TÍTULO */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Relatórios e Análises
        </h1>
        <p className="text-gray-500 mb-12">
          Acompanhe o desempenho da sua lanchonete
        </p>

        {/* CARDS SUPERIORES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

          <CardTop
            title="Vendas Hoje"
            value={stats?.vendasHoje}
            icon={<Receipt className="w-6 h-6 text-orange-500" />}
          />

          <CardTop
            title="Pedidos Hoje"
            value={stats?.pedidosHoje}
            icon={<ShoppingBag className="w-6 h-6 text-orange-500" />}
          />

          <CardTop
            title="Ticket Médio"
            value={stats?.ticketMedio}
            icon={<CreditCard className="w-6 h-6 text-orange-500" />}
          />

          <CardTop
            title="Produtos Ativos"
            value={stats?.produtosAtivos}
            icon={<ArrowUpRight className="w-6 h-6 text-orange-500" />}
          />
        </div>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* MAIS VENDIDOS */}
          <div className="bg-white shadow-sm rounded-2xl p-8 border border-[#ECEAE5]">
            <h2 className="font-bold text-xl text-gray-900 mb-6">
              Produtos Mais Vendidos Hoje
            </h2>

            {maisVendidos.length === 0 ? (
              <PlaceholderList count={5} />
            ) : (
              maisVendidos.map((item, index) => (
                <MaisVendidoItem key={item.id} index={index} item={item} />
              ))
            )}
          </div>

          {/* FORMAS DE PAGAMENTO */}
          <div className="bg-white shadow-sm rounded-2xl p-8 border border-[#ECEAE5]">
            <h2 className="font-bold text-xl text-gray-900 mb-6">
              Formas de Pagamento
            </h2>

            {pagamentos.length === 0 ? (
              <PlaceholderPayment />
            ) : (
              pagamentos.map((p) => <Pagamento key={p.tipo} item={p} />)
            )}
          </div>
        </div>

        {/* VENDAS DA SEMANA */}
        <div className="bg-white shadow-sm rounded-2xl p-10 border border-[#ECEAE5] mt-12">
          <h2 className="font-bold text-2xl text-gray-900 mb-8">Vendas da Semana</h2>

          <div className="grid grid-cols-7 gap-6">
            {diasDaSemana.map((d, index) => (
              <div
                key={d}
                className="bg-white border border-[#ECEAE5] rounded-xl p-5 shadow-sm flex flex-col items-center text-center"
              >
                <span className="font-semibold text-gray-900 text-lg">{d}</span>
                <span className="text-orange-500 mt-1 font-semibold">
                  {vendasSemana[index]?.valor ?? "R$ 0"}
                </span>
                <span className="text-gray-500 text-sm">
                  {vendasSemana[index]?.qtd ?? "0"} pedidos
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ COMPONENTES ------------------------------ */

// CARD DO TOPO
function CardTop({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl border border-[#ECEAE5] shadow-sm p-6 flex items-center justify-between">
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 mt-1">
          {value ?? "—"}
        </p>
      </div>
      {icon}
    </div>
  );
}

// ITEM DE MAIS VENDIDOS
function MaisVendidoItem({ index, item }) {
  return (
    <div className="flex items-center justify-between p-4 bg-[#FAF9F7] rounded-xl mb-3">
      <span className="bg-orange-500 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">
        {index + 1}
      </span>

      <div className="flex-1 ml-4">
        <p className="font-semibold text-gray-900">{item.nome}</p>
        <span className="text-gray-500 text-sm">{item.quantidade} unidades</span>
      </div>

      <span className="font-bold text-green-600">
        R$ {item.total}
      </span>
    </div>
  );
}

// PLACEHOLDERS MAIS VENDIDOS
function PlaceholderList({ count }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-4 bg-[#F5F3EF] rounded-xl animate-pulse"
        >
          <div className="bg-orange-200 w-8 h-8 rounded-full"></div>
          <div className="flex-1 ml-4 space-y-2">
            <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="w-16 h-3 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
}

// PLACEHOLDER PAGAMENTO
function PlaceholderPayment() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="w-full flex flex-col gap-2 animate-pulse">
          <div className="h-4 bg-gray-300 w-1/3 rounded"></div>
          <div className="h-2 bg-orange-300 w-full rounded"></div>
        </div>
      ))}
    </div>
  );
}
