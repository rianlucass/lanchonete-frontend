import { useState, useEffect } from "react";
import { Search, Calendar, Filter } from "lucide-react";

export default function HistoricoPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPedidos([]);
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F8F7F5] py-10 px-6">
      
      <div className="max-w-6xl mx-auto">

        {/* Título */}
        <h1 className="text-3xl font-extrabold text-gray-800 mb-10">
          Histórico de Pedidos
        </h1>

        {/* Filtros */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-10 
                        flex flex-col md:flex-row gap-4 items-center">

          {/* Busca */}
          <div className="flex items-center gap-2 w-full md:w-1/3 bg-gray-50 px-3 py-2 
                          rounded-lg border border-gray-200">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar pedido..."
              className="bg-transparent outline-none text-gray-700 w-full"
            />
          </div>

          {/* Data */}
          <div className="flex items-center gap-2 w-full md:w-1/3 bg-gray-50 px-3 py-2 
                          rounded-lg border border-gray-200">
            <Calendar className="w-5 h-5 text-gray-400" />
            <input
              type="date"
              className="bg-transparent outline-none text-gray-700 w-full"
            />
          </div>

          {/* Botão Filtros */}
          <button className="flex items-center gap-2 bg-orange-500 text-white px-6 py-2 
                             rounded-lg hover:bg-orange-600 transition">
            <Filter size={18} />
            Filtros
          </button>
        </div>

        {/* Lista / Tabela */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm w-full overflow-hidden">

          {/* Cabeçalho */}
          <div className="grid grid-cols-5 bg-gray-50 border-b border-gray-200 
                          font-semibold text-gray-700 py-3 px-6 text-sm">
            <span>ID</span>
            <span>Cliente</span>
            <span>Total</span>
            <span>Status</span>
            <span className="text-right">Data</span>
          </div>

          {/* Conteúdo */}
          {loading ? (
            <div className="p-6 text-gray-400 italic">Carregando pedidos...</div>
          ) : pedidos.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Nenhum pedido encontrado
            </div>
          ) : (
            pedidos.map((p) => (
              <div
                key={p.id}
                className="grid grid-cols-5 px-6 py-4 border-b border-gray-100 
                           hover:bg-orange-50 transition cursor-pointer"
              >
                <span className="font-medium text-gray-800">{p.id}</span>
                <span className="text-gray-700">{p.cliente}</span>
                <span className="text-gray-900 font-semibold">R$ {p.total}</span>

                <span
                  className={`text-sm font-medium px-2 py-1 rounded-lg w-fit ${
                    p.status === "concluido"
                      ? "bg-green-100 text-green-700"
                      : p.status === "cancelado"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {p.status}
                </span>

                <span className="text-right text-gray-700">{p.data}</span>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
