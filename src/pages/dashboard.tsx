import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, ShoppingCart, Package, AlertTriangle, Eye, Settings, Plus } from "lucide-react";

interface Produto {
  nome: string;
  quantidade: number;
}

function Dashboard() {
  const [vendasHoje, setVendasHoje] = useState<number | null>(null);
  const [pedidosHoje, setPedidosHoje] = useState<number | null>(null);
  const [totalProdutos, setTotalProdutos] = useState<number | null>(null);
  const [produtosBaixoEstoque, setProdutosBaixoEstoque] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/dashboard", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        setVendasHoje(data.vendasHoje || 0);
        setPedidosHoje(data.pedidosHoje || 0);
        setTotalProdutos(data.totalProdutos || 0);
        setProdutosBaixoEstoque(data.produtosBaixoEstoque || []);
      } else {
        console.error("Erro ao carregar dados do dashboard");
      }
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 p-8 flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-6xl bg-orange-600 text-white rounded-2xl p-8 shadow-lg text-center">
        <h1 className="text-3xl font-bold">Sistema de Gestão</h1>
        <p className="text-orange-100 mt-2">Controle total da sua lanchonete</p>
      </div>

      {/* Cards principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 w-full max-w-6xl">
        
        <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500 text-sm font-medium">Vendas Hoje</h3>
            <TrendingUp className="text-green-600 w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-green-700 mt-2">
            {vendasHoje !== null ? `R$ ${vendasHoje.toFixed(2)}` : "--"}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500 text-sm font-medium">Pedidos</h3>
            <ShoppingCart className="text-orange-600 w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-orange-700 mt-2">
            {pedidosHoje !== null ? pedidosHoje : "--"}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500 text-sm font-medium">Produtos</h3>
            <Package className="text-blue-600 w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-blue-700 mt-2">
            {totalProdutos !== null ? totalProdutos : "--"}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500 text-sm font-medium">Estoque Baixo</h3>
            <AlertTriangle className="text-yellow-500 w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-yellow-600 mt-2">
            {produtosBaixoEstoque.length}
          </p>
        </div>
      </div>

      {/* Botões */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <Link 
          to="/pedidos" 
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl shadow-md font-medium transition"
        >
          <Plus className="w-5 h-5" /> Novo Pedido
        </Link>

        <Link 
          to="/produtos" 
          className="flex items-center gap-2 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl shadow-sm font-medium transition"
        >
          <Settings className="w-5 h-5 text-orange-600" /> Gerenciar Produtos
        </Link>

        <Link 
          to="/historico" 
          className="flex items-center gap-2 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl shadow-sm font-medium transition"
        >
          <Eye className="w-5 h-5 text-orange-600" /> Ver Relatórios
        </Link>
      </div>

      {/* Lista de baixo estoque */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md mt-10 p-6">
        <h2 className="text-xl font-semibold text-orange-700 mb-1 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-500" /> Produtos com Estoque Baixo
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Monitore os produtos que precisam de reposição
        </p>

        {produtosBaixoEstoque.length === 0 ? (
          <p className="text-gray-400 text-sm">Nenhum produto com estoque baixo.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {produtosBaixoEstoque.map((produto, index) => (
              <li key={index} className="flex justify-between items-center py-3">
                <span className="text-gray-700">{produto.nome}</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    produto.quantidade <= 2
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {produto.quantidade} unidades
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;