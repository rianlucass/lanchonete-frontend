export default function Pedidos() {
  return (
    <div className="w-full min-h-screen bg-[#faf7f2]">
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-gray-800">Novo Pedido</h1>
        <p className="text-gray-500 mb-6">Selecione os produtos para o pedido</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Lanches</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center border rounded-xl p-4 bg-white shadow-sm">
                <div>
                  <p className="font-semibold">Hambúrguer Especial</p>
                  <p className="text-sm text-gray-600">R$ 15.90</p>
                  <span className="text-xs bg-red-200 text-red-700 px-2 py-1 rounded-full">2 disponíveis</span>
                </div>
                <button className="bg-orange-500 text-white w-9 h-9 rounded-full flex items-center justify-center text-xl">+</button>
              </div>

              <div className="flex justify-between items-center border rounded-xl p-4 bg-white shadow-sm">
                <div>
                  <p className="font-semibold">X-Bacon</p>
                  <p className="text-sm text-gray-600">R$ 18.50</p>
                  <span className="text-xs bg-orange-200 text-orange-700 px-2 py-1 rounded-full">8 disponíveis</span>
                </div>
                <button className="bg-orange-500 text-white w-9 h-9 rounded-full flex items-center justify-center text-xl">+</button>
              </div>

              <div className="flex justify-between items-center border rounded-xl p-4 bg-white shadow-sm">
                <div>
                  <p className="font-semibold">X-Salada</p>
                  <p className="text-sm text-gray-600">R$ 14.50</p>
                  <span className="text-xs bg-orange-200 text-orange-700 px-2 py-1 rounded-full">10 disponíveis</span>
                </div>
                <button className="bg-orange-500 text-white w-9 h-9 rounded-full flex items-center justify-center text-xl">+</button>
              </div>
            </div>

            <h2 className="text-lg font-semibold mt-8 mb-4">Bebidas</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center border rounded-xl p-4 bg-white shadow-sm">
                <div>
                  <p className="font-semibold">Refrigerante Cola</p>
                  <p className="text-sm text-gray-600">R$ 5.00</p>
                  <span className="text-xs bg-orange-200 text-orange-700 px-2 py-1 rounded-full">5 disponíveis</span>
                </div>
                <button className="bg-orange-500 text-white w-9 h-9 rounded-full flex items-center justify-center text-xl">+</button>
              </div>

              <div className="flex justify-between items-center border rounded-xl p-4 bg-white shadow-sm">
                <div>
                  <p className="font-semibold">Suco de Laranja</p>
                  <p className="text-sm text-gray-600">R$ 7.50</p>
                  <span className="text-xs bg-orange-200 text-orange-700 px-2 py-1 rounded-full">3 disponíveis</span>
                </div>
                <button className="bg-orange-500 text-white w-9 h-9 rounded-full flex items-center justify-center text-xl">+</button>
              </div>

              <div className="flex justify-between items-center border rounded-xl p-4 bg-white shadow-sm">
                <div>
                  <p className="font-semibold">Água</p>
                  <p className="text-sm text-gray-600">R$ 3.00</p>
                  <span className="text-xs bg-orange-200 text-orange-700 px-2 py-1 rounded-full">15 disponíveis</span>
                </div>
                <button className="bg-orange-500 text-white w-9 h-9 rounded-full flex items-center justify-center text-xl">+</button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
            <h2 className="text-lg font-semibold mb-4">Pedido Atual</h2>
            <p className="text-gray-400 mb-8">Nenhum item adicionado</p>

            <h2 className="text-lg font-semibold mb-2">Forma de Pagamento</h2>
            <select className="w-full border rounded-lg p-2 text-gray-600 mb-4">
              <option>Selecione o pagamento</option>
            </select>

            <button className="w-full bg-green-300 text-white py-3 rounded-lg font-semibold">
              Finalizar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
