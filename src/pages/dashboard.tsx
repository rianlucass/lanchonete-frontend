import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, ShoppingCart, Package, AlertTriangle, Eye, Plus, DollarSign, Calendar, Award } from "lucide-react";
import { api } from "../service/api";

// Interfaces
interface TodayTopProductDTO {
  productName: string;
  quantity: number;
  revenue: number;
  position: number;
}

interface LowStockProductDTO {
  productName: string;
  currentStock: number;
  minimumStock: number;
}

interface DashboardData {
  todaySales: number;
  todayOrders: number;
  averageTicket: number;
  activeProducts: number;
  lowStockProductsCount: number;
  lowStockProducts: LowStockProductDTO[];
  topProduct: TodayTopProductDTO | null;
}

function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const loadDashboardData = async () => {
    setLoading(true);
    setErro(null);

    try {
      // Fazer chamadas paralelas para otimizar
      const [salesRes, ordersRes, ticketRes, productsRes, lowStockCountRes, lowStockRes, topProductRes] = await Promise.all([
        api.get<number>("/reports/today-sales"),
        api.get<number>("/reports/today-orders"),
        api.get<number>("/reports/today-average-ticket"),
        api.get<number>("/reports/active-products"),
        api.get<number>("/reports/low-stock-count"),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        api.get<LowStockProductDTO[]>("/reports/daily").then(res => (res.data as any).lowStockProducts || []),
        api.get<TodayTopProductDTO>("/reports/today-most-sold-product").catch(() => ({ data: null }))
      ]);

      setDashboardData({
        todaySales: salesRes.data || 0,
        todayOrders: ordersRes.data || 0,
        averageTicket: ticketRes.data || 0,
        activeProducts: productsRes.data || 0,
        lowStockProductsCount: lowStockCountRes.data || 0,
        lowStockProducts: lowStockRes || [],
        topProduct: topProductRes.data
      });

    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
      setErro("Erro ao carregar dados do dashboard. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F6F2] p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F2] p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white rounded-2xl p-10 shadow-xl mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-extrabold mb-2">Dashboard</h1>
              <p className="text-orange-100 text-lg">Bem-vindo ao sistema de gestão da lanchonete</p>
              <p className="text-orange-200 text-sm mt-1">{new Date().toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
            <button
              onClick={loadDashboardData}
              className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition shadow-md"
            >
              Atualizar
            </button>
          </div>
        </div>

        {/* Mensagem de Erro */}
        {erro && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {erro}
          </div>
        )}

        {/* Cards principais */}
        {dashboardData && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-gray-500 text-sm font-medium">Vendas Hoje</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">
                      {formatarMoeda(dashboardData.todaySales)}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <DollarSign className="text-green-600 w-6 h-6" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <TrendingUp size={14} className="text-green-500" />
                  Receita do dia
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-gray-500 text-sm font-medium">Pedidos Hoje</h3>
                    <p className="text-3xl font-bold text-orange-600 mt-2">
                      {dashboardData.todayOrders}
                    </p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <ShoppingCart className="text-orange-600 w-6 h-6" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar size={14} className="text-orange-500" />
                  Pedidos realizados
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-gray-500 text-sm font-medium">Ticket Médio</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">
                      {formatarMoeda(dashboardData.averageTicket)}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <TrendingUp className="text-blue-600 w-6 h-6" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <DollarSign size={14} className="text-blue-500" />
                  Valor médio por pedido
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-gray-500 text-sm font-medium">Produtos Ativos</h3>
                    <p className="text-3xl font-bold text-purple-600 mt-2">
                      {dashboardData.activeProducts}
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Package className="text-purple-600 w-6 h-6" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Package size={14} className="text-purple-500" />
                  Total no catálogo
                </p>
              </div>
            </div>

            {/* Produto Mais Vendido + Alerta de Estoque */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              
              {/* Produto Mais Vendido */}
              {dashboardData.topProduct ? (
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 shadow-lg text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-8 h-8" />
                    <h2 className="text-2xl font-bold">Mais Vendido Hoje</h2>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                    <p className="text-2xl font-bold">{dashboardData.topProduct.productName} 🏆</p>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 rounded-2xl p-8 shadow-md flex items-center justify-center">
                  <p className="text-gray-500 text-center">Nenhum produto vendido hoje</p>
                </div>
              )}

              {/* Alerta de Estoque */}
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-yellow-500" />
                    Alerta de Estoque
                  </h2>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                    dashboardData.lowStockProductsCount > 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                  }`}>
                    {dashboardData.lowStockProductsCount} {dashboardData.lowStockProductsCount === 1 ? "produto" : "produtos"}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-4">
                  {dashboardData.lowStockProductsCount > 0 
                    ? "Produtos que precisam de reposição urgente"
                    : "Todos os produtos estão com estoque adequado"}
                </p>
                {dashboardData.lowStockProductsCount > 0 && (
                  <Link 
                    to="/relatorio"
                    className="block w-full bg-orange-500 text-white text-center py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                  >
                    Ver Detalhes Completos
                  </Link>
                )}
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Ações Rápidas</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <Link 
                  to="/pedidos" 
                  className="flex items-center gap-4 p-6 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl shadow-md transition transform hover:scale-105"
                >
                  <div className="bg-white/20 p-3 rounded-full">
                    <Plus className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Novo Pedido</p>
                    <p className="text-sm opacity-90">Registrar venda</p>
                  </div>
                </Link>

                <Link 
                  to="/produtos" 
                  className="flex items-center gap-4 p-6 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-xl shadow-sm transition transform hover:scale-105"
                >
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Package className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gray-800">Produtos</p>
                    <p className="text-sm text-gray-500">Gerenciar estoque</p>
                  </div>
                </Link>

                <Link 
                  to="/relatorio" 
                  className="flex items-center gap-4 p-6 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-xl shadow-sm transition transform hover:scale-105"
                >
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gray-800">Relatórios</p>
                    <p className="text-sm text-gray-500">Análises completas</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Lista de Estoque Baixo */}
            {dashboardData.lowStockProducts.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md mt-8 p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-yellow-500" />
                  Produtos com Estoque Baixo
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dashboardData.lowStockProducts.slice(0, 6).map((produto, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg hover:shadow-md transition"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{produto.productName}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Mínimo: {produto.minimumStock} unidades
                        </p>
                      </div>
                      <span className="ml-4 px-3 py-1 bg-red-600 text-white rounded-full text-sm font-bold">
                        {produto.currentStock}
                      </span>
                    </div>
                  ))}
                </div>

                {dashboardData.lowStockProducts.length > 6 && (
                  <Link
                    to="/relatorio"
                    className="mt-6 block text-center text-orange-600 font-semibold hover:text-orange-700"
                  >
                    Ver todos ({dashboardData.lowStockProducts.length} produtos)
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;