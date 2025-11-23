import { useState, useEffect } from "react";

export default function HistoricoPedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    setTimeout(() => setPedidos([]), 1200);
  }, []);

  const placeholders = Array.from({ length: 4 });
  const diasDaSemana = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];

  return (
    <div className="w-full min-h-screen bg-white p-10">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
        Histórico de Pedidos
      </h1>

      <div className="flex flex-col gap-12 max-w-screen-xl mx-auto">
        {(pedidos.length > 0 ? pedidos : placeholders).map((_, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md p-10 flex flex-col justify-between w-full min-h-[180px] border border-white hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-gray-900 font-semibold text-2xl mb-3">Nome do Produto</h2>
            <p className="text-gray-500 text-lg">0 unidades vendidas</p>
          </div>
        ))}

        <div className="bg-white p-10 rounded-2xl shadow-md w-full border border-white">
          <h2 className="font-extrabold text-gray-900 text-3xl mb-8 text-center">
            Vendas da Semana
          </h2>
          <div className="grid grid-cols-7 gap-8">
            {diasDaSemana.map((dia) => (
              <div
                key={dia}
                className="bg-white rounded-xl p-6 border border-white shadow-sm flex flex-col items-center justify-center min-h-[120px] hover:shadow-md transition-shadow duration-300"
              >
                <span className="font-semibold text-gray-800 text-lg">{dia}</span>
                <span className="text-orange-500 mt-2 text-base">0 vendas</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
