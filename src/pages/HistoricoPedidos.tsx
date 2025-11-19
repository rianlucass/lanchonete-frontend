export default function HistoricoPedidos() {
  return (
    <div className="w-full min-h-screen bg-[#faf7f2]">
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-gray-800">Histórico de Pedidos</h1>
        <p className="text-gray-500 mb-6">Acompanhe os pedidos e desempenho diário</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Produtos Mais Vendidos Hoje</h2>

            <div className="space-y-4">
              {[ 
                { nome: "X-Bacon", qtd: 15, valor: "R$ 277.50" },
                { nome: "Hambúrguer Especial", qtd: 12, valor: "R$ 190.80" },
                { nome: "Refrigerante Cola", qtd: 25, valor: "R$ 125.00" },
                { nome: "Batata Frita", qtd: 8, valor: "R$ 96.00" },
                { nome: "Suco de Laranja", qtd: 10, valor: "R$ 75.00" }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-gray-700">{index + 1}</span>
                    <div>
                      <p className="font-semibold">{item.nome}</p>
                      <p className="text-sm text-gray-600">{item.qtd} unidades vendidas</p>
                    </div>
                  </div>
                  <p className="text-green-600 font-semibold">{item.valor}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Formas de Pagamento</h2>

            <div className="space-y-6">
              {[ 
                { nome: "PIX", valor: "R$ 500.20", perc: "40%", trans: "18 transações" },
                { nome: "Cartão", valor: "R$ 412.80", perc: "33%", trans: "15 transações" },
                { nome: "Dinheiro", valor: "R$ 337.50", perc: "27%", trans: "12 transações" }
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span>{item.nome}</span>
                    <span className="font-semibold text-gray-700">{item.valor}</span>
                  </div>
                  <div className="w-full h-2 bg-orange-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400" style={{ width: item.perc }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.trans}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Vendas da Semana</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[ 
              { dia: "Segunda", valor: "R$ 891", pedidos: "32 pedidos" },
              { dia: "Terça", valor: "R$ 1120", pedidos: "41 pedidos" },
              { dia: "Quarta", valor: "R$ 981", pedidos: "38 pedidos" },
              { dia: "Quinta", valor: "R$ 1340", pedidos: "48 pedidos" },
              { dia: "Sexta", valor: "R$ 1681", pedidos: "62 pedidos" },
              { dia: "Sábado", valor: "R$ 1451", pedidos: "55 pedidos" },
              { dia: "Domingo", valor: "R$ 1251", pedidos: "45 pedidos" }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white border rounded-xl p-4 shadow-sm text-center"
              >
                <p className="font-semibold text-gray-700">{item.dia}</p>
                <p className="text-orange-500 font-bold text-lg">{item.valor}</p>
                <p className="text-sm text-gray-600">{item.pedidos}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
