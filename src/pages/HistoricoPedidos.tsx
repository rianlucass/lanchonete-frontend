import { useState, useEffect } from "react";
import { Search, Calendar, XCircle, Eye, X } from "lucide-react";
import { api } from "../service/api";

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface Pedido {
  id: string;
  numeroPedido: string;
  cliente: string;
  total: string;
  status: string;
  data: string;
  dataOriginal: Date;
  metodoPagamento: string;
  itens: OrderItem[];
}

interface OrderAPIResponse {
  id: string;
  orderNumber: string;
  clientName: string;
  totalAmount: number;
  status: string;
  dateTime: string;
  paymentMethod: string;
  items: OrderItem[];
}

export default function HistoricoPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // Filtros
  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  // Modal
  const [pedidoSelecionado, setPedidoSelecionado] = useState<Pedido | null>(null);
  const [modalCancelar, setModalCancelar] = useState<{ aberto: boolean; pedidoId: string | null }>({
    aberto: false,
    pedidoId: null
  });

  // Paginação
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 8;

  async function carregarPedidos() {
    setLoading(true);
    setErro(null);

    try {
      const response = await api.get<OrderAPIResponse[]>("/orders/history");
      
      console.log("Dados recebidos da API:", response.data); // Debug
      
      const dados = response.data.map((p) => {
        // Validação e tratamento de campos opcionais
        const pedido = {
          id: p.id || "",
          numeroPedido: p.orderNumber || "N/A",
          cliente: p.clientName || "Cliente não informado",
          total: (p.totalAmount || 0).toFixed(2).replace(".", ","),
          status: (p.status || "pending").toLowerCase(),
          data: p.dateTime ? new Date(p.dateTime).toLocaleDateString("pt-BR") : "Data inválida",
          dataOriginal: p.dateTime ? new Date(p.dateTime) : new Date(0), // Para ordenação
          metodoPagamento: p.paymentMethod || "Não informado",
          itens: Array.isArray(p.items) ? p.items : [],
        };
        
        console.log("Pedido mapeado:", pedido); // Debug
        return pedido;
      }).sort((a, b) => b.dataOriginal.getTime() - a.dataOriginal.getTime()); // Mais recentes primeiro

      setPedidos(dados);
      console.log("Total de pedidos carregados:", dados.length); // Debug
    } catch (e) {
      console.error("Erro ao carregar pedidos:", e);
      setErro("Erro ao carregar histórico de pedidos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarPedidos();
  }, []);

  // Handler cancelamento
  async function cancelarPedido(id: string) {
    try {
      await api.put(`/orders/${id}/cancel`);
      
      // Atualiza o estado localmente para feedback imediato
      setPedidos(prev => prev.map(p => 
        p.id === id ? { ...p, status: "canceled" } : p
      ));

      // Fecha o modal
      setModalCancelar({ aberto: false, pedidoId: null });
    } catch (e) {
      console.error(e);
      setErro("Erro ao cancelar pedido. Tente novamente.");
    }
  }

  // Filtro final aplicado
  const pedidosFiltrados = pedidos
    .filter((p) =>
      p.numeroPedido.toLowerCase().includes(busca.toLowerCase().trim())
    )
    .filter((p) => (statusFiltro ? p.status === statusFiltro : true))
    .filter((p) => {
      if (!dataInicio || !dataFim) return true;
      const dataPedido = new Date(p.data.split("/").reverse().join("-"));
      return dataPedido >= new Date(dataInicio) && dataPedido <= new Date(dataFim);
    });

  // Paginação
  const inicio = (pagina - 1) * itensPorPagina;
  const pedidosPaginados = pedidosFiltrados.slice(inicio, inicio + itensPorPagina);

  const totalPaginas = Math.ceil(pedidosFiltrados.length / itensPorPagina);

  return (
    <div className="w-full min-h-screen bg-[#F8F7F5] py-10 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Título */}
        <h1 className="text-3xl font-extrabold text-gray-800 mb-10">
          Histórico de Pedidos
        </h1>

        {/* Mensagem de Erro */}
        {erro && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {erro}
          </div>
        )}

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
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="bg-transparent outline-none text-gray-700 w-full"
            />
          </div>

          {/* Data início */}
          <div className="flex items-center gap-2 w-full md:w-1/4 bg-gray-50 px-3 py-2 
                          rounded-lg border border-gray-200">
            <Calendar className="w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="bg-transparent outline-none text-gray-700 w-full"
            />
          </div>

          {/* Data fim */}
          <div className="flex items-center gap-2 w-full md:w-1/4 bg-gray-50 px-3 py-2 
                          rounded-lg border border-gray-200">
            <Calendar className="w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="bg-transparent outline-none text-gray-700 w-full"
            />
          </div>

          {/* Filtro Status */}
          <select
            value={statusFiltro}
            onChange={(e) => setStatusFiltro(e.target.value)}
            className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg text-gray-700"
          >
            <option value="">Status</option>
            <option value="completed">Concluído</option>
            <option value="canceled">Cancelado</option>
          </select>
        </div>

        {/* Lista */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm w-full overflow-hidden">

          {/* Cabeçalho */}
          <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200 
                          font-semibold text-gray-700 py-3 px-6 text-sm">
            <span>Nº Pedido</span>
            <span>Cliente</span>
            <span>Total</span>
            <span>Pagamento</span>
            <span>Status</span>
            <span>Data</span>
            <span className="text-right">Ação</span>
          </div>

          {loading ? (
            <div className="p-6 text-gray-400 italic">Carregando pedidos...</div>
          ) : pedidosPaginados.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Nenhum pedido encontrado
            </div>
          ) : (
            pedidosPaginados.map((p) => (
              <div
                key={p.id}
                className="grid grid-cols-7 px-6 py-4 border-b border-gray-100 
                           hover:bg-orange-50 transition"
              >
                <span className="text-gray-800 font-medium">{p.numeroPedido}</span>
                <span className="text-gray-700">{p.cliente}</span>
                <span className="text-gray-800 font-semibold">R$ {p.total}</span>
                <span className="text-gray-700 font-medium">
                  {p.metodoPagamento === "CREDIT_CARD" ? "Cartão de Crédito" :
                   p.metodoPagamento === "DEBIT_CARD" ? "Cartão de Débito" :
                   p.metodoPagamento === "PIX" ? "PIX" :
                   p.metodoPagamento === "CASH" ? "Dinheiro" :
                   p.metodoPagamento}
                </span>

                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full w-fit uppercase ${
                    p.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : p.status === "canceled"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {p.status === "completed" ? "Concluído" : p.status === "canceled" ? "Cancelado" : p.status}
                </span>

                <span className="text-gray-600">{p.data}</span>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setPedidoSelecionado(p)}
                    className="text-blue-600 hover:text-blue-800 transition"
                    title="Ver detalhes"
                  >
                    <Eye size={18} />
                  </button>

                  {p.status !== "canceled" && (
                    <button
                      onClick={() => setModalCancelar({ aberto: true, pedidoId: p.id })}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Cancelar pedido"
                    >
                      <XCircle size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Paginação */}
        {totalPaginas > 1 && (
          <div className="flex justify-center mt-6 gap-3">
            <button
              onClick={() => setPagina(p => Math.max(1, p - 1))}
              disabled={pagina === 1}
              className={`px-4 py-2 rounded-lg border transition ${
                pagina === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-orange-100"
              }`}
            >
              Anterior
            </button>

            {Array.from({ length: totalPaginas }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPagina(i + 1)}
                className={`px-4 py-2 rounded-lg border transition ${
                  pagina === i + 1
                    ? "bg-orange-500 text-white font-bold"
                    : "bg-white text-gray-700 hover:bg-orange-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
              disabled={pagina === totalPaginas}
              className={`px-4 py-2 rounded-lg border transition ${
                pagina === totalPaginas
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-orange-100"
              }`}
            >
              Próxima
            </button>
          </div>
        )}

      </div>

      {/* MODAL DE CANCELAMENTO */}
      {modalCancelar.aberto && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
            
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Cancelar Pedido
              </h2>
              
              <p className="text-gray-600">
                Tem certeza que deseja cancelar este pedido? Esta ação não pode ser desfeita.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setModalCancelar({ aberto: false, pedidoId: null })}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold 
                           hover:bg-gray-300 transition"
              >
                Não, manter
              </button>
              
              <button
                onClick={() => modalCancelar.pedidoId && cancelarPedido(modalCancelar.pedidoId)}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold 
                           hover:bg-red-700 transition"
              >
                Sim, cancelar
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL */}
      {pedidoSelecionado && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">

            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
              onClick={() => setPedidoSelecionado(null)}
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Pedido #{pedidoSelecionado.numeroPedido}
            </h2>

            <div className="mb-6 pb-4 border-b border-gray-200">
              <p className="text-gray-600"><span className="font-semibold">Cliente:</span> {pedidoSelecionado.cliente}</p>
              <p className="text-gray-600"><span className="font-semibold">Data:</span> {pedidoSelecionado.data}</p>
              <p className="text-gray-600">
                <span className="font-semibold">Método de Pagamento:</span>
                <span className={
                  pedidoSelecionado.metodoPagamento === "CREDIT_CARD" ? "ml-2 text-blue-600" :
                  pedidoSelecionado.metodoPagamento === "DEBIT_CARD" ? "ml-2 text-green-600" :
                  pedidoSelecionado.metodoPagamento === "PIX" ? "ml-2 text-purple-600" :
                  pedidoSelecionado.metodoPagamento === "CASH" ? "ml-2 text-yellow-600" :
                  "ml-2 text-gray-600"
                }>
                  {pedidoSelecionado.metodoPagamento === "CREDIT_CARD" ? "Cartão de Crédito" :
                   pedidoSelecionado.metodoPagamento === "DEBIT_CARD" ? "Cartão de Débito" :
                   pedidoSelecionado.metodoPagamento === "PIX" ? "PIX" :
                   pedidoSelecionado.metodoPagamento === "CASH" ? "Dinheiro" :
                   pedidoSelecionado.metodoPagamento}
                </span>
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Status:</span> 
                <span className={`ml-2 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  pedidoSelecionado.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : pedidoSelecionado.status === "canceled"
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {pedidoSelecionado.status === "completed" ? "Concluído" : 
                   pedidoSelecionado.status === "canceled" ? "Cancelado" : 
                   pedidoSelecionado.status}
                </span>
              </p>
            </div>

            <h3 className="font-semibold text-lg mb-4 text-gray-800">Itens do Pedido</h3>

            {pedidoSelecionado.itens && pedidoSelecionado.itens.length > 0 ? (
              <div className="space-y-4">
                {pedidoSelecionado.itens.map((item, index) => (
                  <div key={item.id || index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <p className="font-bold text-gray-800 mb-2">{item.productName || "Produto não informado"}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <p><span className="font-medium">Quantidade:</span> {item.quantity || 0}</p>
                      <p><span className="font-medium">Preço Unit.:</span> R$ {(item.unitPrice || 0).toFixed(2).replace(".", ",")}</p>
                      <p className="col-span-2"><span className="font-medium">Subtotal:</span> 
                        <span className="font-bold text-orange-600"> R$ {(item.subtotal || 0).toFixed(2).replace(".", ",")}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700">
                Nenhum item encontrado para este pedido.
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-300">
              <p className="text-xl font-bold text-gray-800">
                Total: <span className="text-orange-600">R$ {pedidoSelecionado.total}</span>
              </p>
            </div>

            <button
              onClick={() => setPedidoSelecionado(null)}
              className="mt-6 w-full bg-orange-500 text-white py-3 rounded-lg font-semibold 
                         hover:bg-orange-600 transition"
            >
              Fechar
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
