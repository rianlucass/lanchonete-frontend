export default function Dashboard() {
  const produtosBaixoEstoque = [
    { nome: "Hambúrguer Especial", quantidade: 2 },
    { nome: "Refrigerante Cola", quantidade: 5 },
    { nome: "Batata Frita", quantidade: 1 },
    { nome: "Suco de Laranja", quantidade: 3 },
    { nome: "Pão de Açúcar", quantidade: 4 },
  ];

  return (
    <div className="p-4 md:p-8">
      {/* Cabeçalho */}
      <div className="bg-orange-500 text-white rounded-xl p-6 mb-6 shadow-md">
        <h1 className="text-2xl font-bold">Sistema de Gestão</h1>
        <p className="mt-2 text-sm md:text-base">
          Bem-vindo ao painel da Boca Cheia! Aqui você controla tudo de forma simples e rápida.
        </p>
      </div>

      {/* Lista de produtos com estoque baixo */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-yellow-700">
          ⚠️ Produtos com Estoque Baixo
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Monitore os produtos que precisam de reposição
        </p>

        <ul className="divide-y divide-gray-200">
          {produtosBaixoEstoque.map((produto, index) => (
            <li
              key={index}
              className="py-3 flex justify-between items-center text-sm md:text-base"
            >
              <span>{produto.nome}</span>

              <span
                className={`px-3 py-1 rounded-full text-white text-xs ${
                  produto.quantidade <= 2
                    ? "bg-red-500"
                    : "bg-yellow-500"
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
