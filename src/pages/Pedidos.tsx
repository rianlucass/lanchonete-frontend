/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";

const Pedidos = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [produtos] = useState<any[]>([]); // depois vai vir da API
  const [pedido] = useState<any[]>([]); // depois preenche quando clicar em +

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] py-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Novo Pedido</h1>
            <p className="text-sm text-gray-500">
              Selecione produtos para adicionar ao pedido
            </p>
          </div>
          <ShoppingCart className="w-10 h-10 text-orange-600 opacity-70" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LISTA DE PRODUTOS */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {produtos.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-center text-gray-400">
                  <ShoppingCart className="w-14 h-14 mb-3 opacity-40" />
                  <h2 className="text-xl font-medium">Nenhum produto disponível</h2>
                  <p className="text-sm">
                    O cardápio está vazio no momento.
                  </p>
                </div>
              ) : (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                produtos.map((p: any) => (
                  <div
                    key={p.id}
                    className="bg-white border border-[#EAE7E2] rounded-xl p-6 shadow-sm hover:shadow-md transition relative"
                  >
                    {/* Nome e estoque */}
                    <div className="flex items-center justify-between mb-4">
                      <p className="font-semibold text-gray-900">{p.name}</p>
                      <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-md">
                        {p.stock} un.
                      </span>
                    </div>

                    {/* Preço */}
                    <p className="text-2xl font-bold text-orange-600">
                      R$ {p.price.toFixed(2)}
                    </p>

                    {/* Botão adicionar */}
                    <button
                      className="absolute bottom-4 right-4 w-12 h-12 bg-orange-600 hover:bg-orange-700 text-white rounded-lg shadow-md flex items-center justify-center transition"
                      aria-label="Adicionar produto"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RESUMO DO PEDIDO */}
          <div className="bg-white border border-[#EAE7E2] rounded-xl p-6 shadow-sm h-fit">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Resumo do Pedido</h2>

            {pedido.length === 0 ? (
              <p className="text-gray-400 mb-6">Nenhum item adicionado</p>
            ) : (
              <ul className="mb-6 space-y-2">
                {pedido.map((item: any) => (
                  <li key={item.id} className="flex justify-between">
                    <span>{item.name}</span>
                    <span className="font-semibold">R$ {item.price}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Selecionar pagamento */}
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-1">Forma de Pagamento</h3>
              <select className="w-full border rounded-lg p-2 text-gray-600">
                <option>PIX</option>
                <option>Cartão de Crédito</option>
                <option>Dinheiro</option>
              </select>
            </div>

            {/* Finalizar */}
            <button
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              Finalizar Pedido
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Pedidos;
