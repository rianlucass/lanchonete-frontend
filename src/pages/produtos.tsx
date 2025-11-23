
export default function produtos() {
  return (
    <div className="min-h-screen bg-[#F8F7F5] px-8 py-8 flex flex-row">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-1 content-start">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-8 border border-[#F2F1EE] flex flex-col items-stretch min-h-[200px] max-w-[350px]"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-left">
              Nome do Produto
            </h2>
            <span className="text-xs text-gray-300 mb-6">
              Nenhum produto cadastrado ainda
            </span>
            <div className="flex gap-2 mt-auto">
              <button className="flex-grow bg-gray-100 text-gray-700 py-2 rounded-lg border border-gray-200 hover:bg-gray-200 transition text-base font-medium flex items-center justify-center">
                Editar
              </button>
              <button className="p-2" aria-label="Excluir" title="Excluir">
                <span className="text-red-500 text-base font-bold">x</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center ml-8 justify-start">
        <button className="bg-orange-500 text-white font-semibold rounded-lg px-7 py-3 mt-6 shadow hover:bg-orange-600 transition">
          + Novo Pedido
        </button>
      </div>
    </div>
  );
}
