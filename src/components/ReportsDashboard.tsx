type PaymentSummary = {
  metodo: string;
  valor: number;
  percentual: number;
  transacoes: number;
};

type ProductSummary = {
  id: string | number;
  nome: string;
  unidades: number;
  valorTotal: number;
};

type DailySummary = {
  diaLabel: string;
  total: number;
  pedidos: number;
};

export type ReportsData = {
  vendasHoje?: number;
  variacaoVendasHoje?: number;
  pedidosHoje?: number;
  ticketMedio?: number;
  produtosAtivos?: number;
  produtosMaisVendidosHoje?: ProductSummary[];
  formasPagamentoHoje?: PaymentSummary[];
  vendasSemana?: DailySummary[];
};

type Props = {
  data: ReportsData;
};

export default function ReportsDashboard({ data }: Props) {
  const vendasHoje = data.vendasHoje ?? 0;
  const variacao = data.variacaoVendasHoje ?? 0;
  const pedidosHoje = data.pedidosHoje ?? 0;
  const ticketMedio = data.ticketMedio ?? 0;
  const produtosAtivos = data.produtosAtivos ?? 0;
  const produtosMaisVendidos = data.produtosMaisVendidosHoje ?? [];
  const formasPagamento = data.formasPagamentoHoje ?? [];
  const vendasSemana = data.vendasSemana ?? [];

  return (
    <div className="min-h-screen bg-[#FFF7ED] py-6">
      <div className="mx-auto flex max-w-6xl flex-col px-4">
        <div className="mb-4 flex items-center justify-between">
          <button className="flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-1.5 text-xs font-medium text-amber-700 shadow-sm hover:bg-amber-50">
            <span className="text-lg">←</span>
            Voltar ao Dashboard
          </button>

          <nav className="hidden gap-4 text-sm font-medium text-slate-500 md:flex">
            <span className="cursor-pointer hover:text-amber-600">Dashboard</span>
            <span className="cursor-pointer hover:text-amber-600">Produtos</span>
            <span className="cursor-pointer hover:text-amber-600">Novo Pedido</span>
            <span className="rounded-full bg-amber-500 px-3 py-1 text-white shadow-sm">
              Relatórios
            </span>
          </nav>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-slate-900">
            Relatórios e Análises
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Acompanhe o desempenho da sua lanchonete.
          </p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          {/* Vendas Hoje */}
          <div className="rounded-2xl bg-white p-4 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Vendas Hoje
            </p>
            <p className="mt-3 text-2xl font-semibold text-emerald-600">
              R$ {vendasHoje.toFixed(2)}
            </p>
            <p className="mt-1 flex items-center gap-1 text-xs text-emerald-500">
              <span className="text-sm">▲</span>
              {variacao === 0 ? "–" : `${variacao > 0 ? "+" : ""}${variacao}% em relação a ontem`}
            </p>
          </div>

          {/* Pedidos Hoje */}
          <div className="rounded-2xl bg-white p-4 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Pedidos Hoje
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">
              {pedidosHoje}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {pedidosHoje === 0 ? "–" : "Pedidos realizados"}
            </p>
          </div>

          {/* Ticket Médio */}
          <div className="rounded-2xl bg-white p-4 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Ticket Médio
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">
              {ticketMedio === 0 ? "–" : `R$ ${ticketMedio.toFixed(2)}`}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Valor médio por pedido
            </p>
          </div>

          {/* Produtos Ativos */}
          <div className="rounded-2xl bg-white p-4 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Produtos Ativos
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">
              {produtosAtivos}
            </p>
            <p className="mt-1 text-xs text-slate-500">Itens no cardápio</p>
          </div>
        </div>

        <div className="mb-6 grid gap-4 lg:grid-cols-2">
          {/* Produtos mais vendidos */}
          <div className="rounded-2xl bg-white p-4 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Produtos Mais Vendidos Hoje
                </h2>
                <p className="text-xs text-slate-500">
                  Ranking dos itens com melhor performance
                </p>
              </div>
            </div>

            {produtosMaisVendidos.length === 0 ? (
              <p className="text-xs text-slate-400">–</p>
            ) : (
              <div className="space-y-2">
                {produtosMaisVendidos.map((produto, index) => (
                  <div
                    key={produto.id}
                    className="flex items-center justify-between rounded-xl border border-amber-100 bg-amber-50/60 px-3 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-semibold text-amber-700 shadow-sm">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {produto.nome || "–"}
                        </p>
                        <p className="text-xs text-slate-500">
                          {(produto.unidades ?? 0)} unidades vendidas
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-emerald-600">
                      {produto.valorTotal === 0 || produto.valorTotal === undefined
                        ? "R$ 0,00"
                        : `R$ ${produto.valorTotal.toFixed(2)}`}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Formas de pagamento */}
          <div className="rounded-2xl bg-white p-4 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-slate-900">
                Formas de Pagamento
              </h2>
              <p className="text-xs text-slate-500">
                Distribuição dos métodos de pagamento hoje
              </p>
            </div>

            {formasPagamento.length === 0 ? (
              <p className="text-xs text-slate-400">–</p>
            ) : (
              <div className="space-y-4">
                {formasPagamento.map((fp) => (
                  <div key={fp.metodo}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700">
                        {fp.metodo || "–"}
                      </span>
                      <span className="font-medium text-slate-700">
                        {fp.valor === 0 || fp.valor === undefined
                          ? "R$ 0,00"
                          : `R$ ${fp.valor.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-amber-100">
                      <div
                        className="h-full rounded-full bg-amber-500"
                        style={{ width: `${fp.percentual ?? 0}%` }}
                      />
                    </div>
                    <div className="mt-1 flex justify-between text-[11px] text-slate-500">
                      <span>{fp.transacoes ?? 0} transações</span>
                      <span>{fp.percentual ?? 0}% do total</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Vendas da semana */}
        <div className="mb-4 rounded-2xl bg-white p-4 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-slate-900">
              Vendas da Semana
            </h2>
            <p className="text-xs text-slate-500">
              Performance diária dos últimos 7 dias
            </p>
          </div>

          {vendasSemana.length === 0 ? (
            <p className="text-xs text-slate-400">–</p>
          ) : (
            <div className="grid gap-3 md:grid-cols-7">
              {vendasSemana.map((dia) => (
                <div
                  key={dia.diaLabel}
                  className="flex flex-col items-start rounded-xl bg-amber-50 px-3 py-2 text-left"
                >
                  <span className="text-[11px] font-medium text-slate-500">
                    {dia.diaLabel || "–"}
                  </span>
                  <span className="mt-1 text-sm font-semibold text-amber-700">
                    {dia.total === 0 || dia.total === undefined
                      ? "R$ 0,00"
                      : `R$ ${dia.total.toFixed(2)}`}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {(dia.pedidos ?? 0)} pedidos
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
