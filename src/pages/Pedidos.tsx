import { useState, useEffect } from "react";

export default function Pedidos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    setTimeout(() => setProdutos([]), 1000);
  }, []);

  const placeholders = Array.from({ length: 4 });

  return (
    <div className="min-h-screen w-full bg-[#faf7f2] p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {(produtos.length > 0 ? produtos : placeholders).map((_, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border flex flex-col relative" style={{ minHeight: 170 }}>
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="font-medium text-gray-700">Nome do Produto</span>
                  <span className="bg-orange-100 text-orange-600 px-2 rounded text-xs">0 disponíveis</span>
                </div>
                <div className="font-semibold text-lg text-gray-700 mb-1">R$ 00,00</div>
                {/* Botão quadrado, laranja e destacado na borda inferior direita */}
                <button
                  className="absolute bottom-4 right-4 w-12 h-12 bg-orange-500 hover:bg-orange-600 text-white text-2xl rounded-lg shadow-md flex items-center justify-center font-bold transition duration-150"
                  disabled
                  aria-label="Adicionar produto"
                  style={{ boxShadow: "0 2px 8px rgba(255,140,0,0.18)" }}
                >
                  +
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border h-fit flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>
          <p className="text-gray-400 mb-4">Nenhum item adicionado</p>
          <h2 className="text-lg font-semibold mb-2">Forma de Pagamento</h2>
          <select className="w-full border rounded-lg p-2 text-gray-600 mb-4" disabled>
            <option>Selecione o pagamento</option>
          </select>
          <button
            className="w-full bg-green-400 text-white py-3 rounded-lg font-semibold opacity-50 cursor-not-allowed"
            disabled
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}
