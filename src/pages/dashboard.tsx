import { TrendingUp, ShoppingCart, Package, AlertTriangle, Eye, Settings, Plus } from "lucide-react";

function Dashboard() {
  const produtosBaixoEstoque = [
    { nome: "Hambúrguer Especial", quantidade: 2 },
    { nome: "Refrigerante Cola", quantidade: 5 },
    { nome: "Batata Frita", quantidade: 1 },
    { nome: "Suco de Laranja", quantidade: 3 },
    { nome: "Pão de Açúcar", quantidade: 4 },
  ];

  return (
    <div className="min-h-screen bg-orange-50 p-8 flex flex-col items-center">
      
      <div className="w-full max-w-6xl bg-orange-600 text-white rounded-2xl p-8 shadow-lg text-center">
        <h1 className="text-3xl font-bold">Sistema de Gestão</h1>
        <p className="text-orange-100 mt-2">Controle total da sua lanchonete</p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 w-full max-w-6xl">
        
        <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500 text-sm font-medium">Vendas Hoje</h3>
            <TrendingUp className="text-green-600 w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-green-700 mt-2">R$ 1250,50</p>
          <p className="text-xs text-gray-500 mt-1">+12% em relação a ontem</p>
        </div>

        
        <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500 text-sm font-medium">Pedidos</h3>
            <ShoppingCart className="text-orange-600 w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-orange-700 mt-2">45</p>
          <p className="text-xs text-gray-500 mt-1">Pedidos realizados hoje</p>
        </div>

        
        <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500 text-sm font-medium">Produtos</h3>
            <Package className="text-blue-600 w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-blue-700 mt-2">23</p>
          <p className="text-xs text-gray-500 mt-1">Produtos cadastrados</p>
        </div>

        
        <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500 text-sm font-medium">Estoque Baixo</h3>
            <AlertTriangle className="text-yellow-500 w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-yellow-600 mt-2">5</p>
          <p className="text-xs text-gray-500 mt-1">Produtos com estoque baixo</p>
        </div>
      </div>

      
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl shadow-md font-medium transition">
          <Plus className="w-5 h-5" /> Novo Pedido
        </button>

        <button className="flex items-center gap-2 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl shadow-sm font-medium transition">
          <Settings className="w-5 h-5 text-orange-600" /> Gerenciar Produtos
        </button>

        <button className="flex items-center gap-2 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl shadow-sm font-medium transition">
          <Eye className="w-5 h-5 text-orange-600" /> Ver Relatórios
        </button>
      </div>

      
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md mt-10 p-6">
        <h2 className="text-xl font-semibold text-orange-700 mb-1 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-500" /> Produtos com Estoque Baixo
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Monitore os produtos que precisam de reposição
        </p>

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
      </div>
    </div>
  );
}

export default Dashboard;
