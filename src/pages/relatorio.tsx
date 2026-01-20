import { useEffect, useState } from "react";
import { Receipt, ShoppingBag, CreditCard, Package, AlertTriangle, TrendingUp, Calendar } from "lucide-react";
import { api } from "../service/api";

// Interfaces TypeScript
interface ProductSalesDTO {
  productName: string;
  quantitySold: number;
  totalRevenue: number;
}

interface DailySalesDTO {
  date: string;
  salesAmount: number;
  ordersCount: number;
}

interface LowStockProductDTO {
  productName: string;
  currentStock: number;
  minimumStock: number;
}

interface ReportDTO {
  todaySales: number;
  todayOrders: number;
  averageTicket: number;
  activeProducts: number;
  topSellingProductsToday: ProductSalesDTO[];
  paymentMethodsSummary: { [key: string]: number };
  weeklySales: DailySalesDTO[];
  lowStockProductsCount: number;
  lowStockProducts: LowStockProductDTO[];
}

export default function Relatorio() {
  const [relatorio, setRelatorio] = useState<ReportDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function carregarRelatorio() {
    setLoading(true);
    setErro(null);

    try {
      const response = await api.get<ReportDTO>("/reports/daily");
      console.log("Relatório recebido:", response.data);
      console.log("topSellingProductsToday:", response.data.topSellingProductsToday);
      console.log("paymentMethodsSummary:", response.data.paymentMethodsSummary);
      console.log("weeklySales:", response.data.weeklySales);
      console.log("lowStockProducts:", response.data.lowStockProducts);
      
      // Garantir que arrays existem e têm valores padrão
      const dadosRelatorio: ReportDTO = {
        ...response.data,
        topSellingProductsToday: response.data.topSellingProductsToday || [],
        paymentMethodsSummary: response.data.paymentMethodsSummary || {},
        weeklySales: response.data.weeklySales || [],
        lowStockProducts: response.data.lowStockProducts || [],
        todaySales: response.data.todaySales || 0,
        todayOrders: response.data.todayOrders || 0,
        averageTicket: response.data.averageTicket || 0,
        activeProducts: response.data.activeProducts || 0,
        lowStockProductsCount: response.data.lowStockProductsCount || 0,
      };
      
      console.log("Dados processados:", dadosRelatorio);
      setRelatorio(dadosRelatorio);
    } catch (e) {
      console.error("Erro ao carregar relatório:", e);
      setErro("Erro ao carregar relatório. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarRelatorio();
  }, []);

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const formatarMetodoPagamento = (metodo: string) => {
    const metodos: { [key: string]: string } = {
      CREDIT_CARD: "Cartão de Crédito",
      DEBIT_CARD: "Cartão de Débito",
      PIX: "PIX",
      CASH: "Dinheiro",
    };
    return metodos[metodo] || metodo;
  };

  const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <div className="w-full min-h-screen bg-[#F8F6F2] px-10 py-12">
      <div className="max-w-7xl mx-auto">

        {/* TÍTULO */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              Relatórios e Análises
            </h1>
            <p className="text-gray-500">
              Acompanhe o desempenho da sua lanchonete • {new Date().toLocaleDateString("pt-BR")}
            </p>
          </div>
          <button
            onClick={carregarRelatorio}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center gap-2"
          >
            <TrendingUp size={20} />
            Atualizar
          </button>
        </div>

        {/* Mensagem de Erro */}
        {erro && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {erro}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
            <p className="text-gray-500 mt-4">Carregando relatório...</p>
          </div>
        ) : relatorio ? (
          <>
            {/* CARDS SUPERIORES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <CardMetrica
                title="Vendas Hoje"
                value={formatarMoeda(relatorio.todaySales)}
                icon={<Receipt className="w-6 h-6 text-orange-500" />}
                bgColor="bg-orange-50"
              />

              <CardMetrica
                title="Pedidos Hoje"
                value={relatorio.todayOrders.toString()}
                icon={<ShoppingBag className="w-6 h-6 text-blue-500" />}
                bgColor="bg-blue-50"
              />

              <CardMetrica
                title="Ticket Médio"
                value={formatarMoeda(relatorio.averageTicket)}
                icon={<CreditCard className="w-6 h-6 text-green-500" />}
                bgColor="bg-green-50"
              />

              <CardMetrica
                title="Produtos Ativos"
                value={relatorio.activeProducts.toString()}
                icon={<Package className="w-6 h-6 text-purple-500" />}
                bgColor="bg-purple-50"
              />
            </div>

            {/* CONTEÚDO PRINCIPAL */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">

              {/* MAIS VENDIDOS */}
              <div className="bg-white shadow-sm rounded-2xl p-8 border border-[#ECEAE5]">
                <h2 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  Top 5 Produtos Mais Vendidos Hoje
                </h2>

                {!relatorio.topSellingProductsToday || relatorio.topSellingProductsToday.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Nenhum produto vendido hoje
                  </div>
                ) : (
                  <div className="space-y-4">
                    {relatorio.topSellingProductsToday.slice(0, 5).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                            index === 0 ? "bg-yellow-500" :
                            index === 1 ? "bg-gray-400" :
                            index === 2 ? "bg-orange-400" :
                            "bg-gray-300"
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{item.productName}</p>
                            <p className="text-sm text-gray-500">{item.quantitySold} unidades vendidas</p>
                          </div>
                        </div>
                        <span className="font-bold text-orange-600">{formatarMoeda(item.totalRevenue)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* FORMAS DE PAGAMENTO */}
              <div className="bg-white shadow-sm rounded-2xl p-8 border border-[#ECEAE5]">
                <h2 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-green-500" />
                  Formas de Pagamento Hoje
                </h2>

                {!relatorio.paymentMethodsSummary || Object.keys(relatorio.paymentMethodsSummary).length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Nenhum pagamento registrado hoje
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(relatorio.paymentMethodsSummary).map(([metodo, valor]) => {
                      const total = Object.values(relatorio.paymentMethodsSummary).reduce((a, b) => a + b, 0);
                      const percentual = total > 0 ? (valor / total) * 100 : 0;

                      return (
                        <div key={metodo} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-700">{formatarMetodoPagamento(metodo)}</span>
                            <span className="font-bold text-gray-800">{formatarMoeda(valor)}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all"
                              style={{ width: `${percentual}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500">{percentual.toFixed(1)}% do total</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* VENDAS DA SEMANA */}
            <div className="bg-white shadow-sm rounded-2xl p-10 border border-[#ECEAE5] mb-10">
              <h2 className="font-bold text-2xl text-gray-900 mb-8 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-500" />
                Vendas dos Últimos 7 Dias
              </h2>

              {!relatorio.weeklySales || relatorio.weeklySales.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Nenhuma venda registrada esta semana
                </div>
              ) : (
                <div className="grid grid-cols-7 gap-4">
                  {relatorio.weeklySales.map((venda) => {
                    const data = new Date(venda.date);
                    const diaSemana = diasDaSemana[data.getDay()];
                    const diaNumero = data.getDate();

                    return (
                      <div
                        key={venda.date}
                        className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-5 shadow-sm flex flex-col items-center text-center hover:scale-105 transition"
                      >
                        <span className="font-bold text-gray-700 text-sm">{diaSemana}</span>
                        <span className="text-xs text-gray-500 mb-2">{diaNumero}</span>
                        <span className="text-orange-600 font-bold text-lg">
                          {formatarMoeda(venda.salesAmount)}
                        </span>
                        <span className="text-gray-600 text-xs mt-1">
                          {venda.ordersCount} pedidos
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ESTOQUE BAIXO */}
            {relatorio.lowStockProducts && relatorio.lowStockProducts.length > 0 && (
              <div className="bg-white shadow-sm rounded-2xl p-8 border border-red-200">
                <h2 className="font-bold text-xl text-red-600 mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Alerta: Produtos com Estoque Baixo ({relatorio.lowStockProductsCount})
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatorio.lowStockProducts.map((produto, index) => (
                    <div
                      key={index}
                      className="bg-red-50 border border-red-200 rounded-lg p-4"
                    >
                      <p className="font-semibold text-gray-800">{produto.productName}</p>
                      <p className="text-sm text-red-600 mt-1">
                        Estoque atual: <span className="font-bold">{produto.currentStock}</span> unidades
                      </p>
                      <p className="text-xs text-gray-500">
                        Mínimo recomendado: {produto.minimumStock}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 text-gray-500">
            Nenhum dado disponível
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------ COMPONENTES ------------------------------ */

interface CardMetricaProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
}

function CardMetrica({ title, value, icon, bgColor }: CardMetricaProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex items-center justify-between hover:shadow-md transition">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`${bgColor} p-4 rounded-full`}>
        {icon}
      </div>
    </div>
  );
}