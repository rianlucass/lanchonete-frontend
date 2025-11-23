import { useState } from "react";
import { Package, Pencil, Trash2, Plus } from "lucide-react";

interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  quantidade: number;
}

function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([
    { id: 1, nome: "Hambúrguer Especial", categoria: "Lanches", preco: 15.9, quantidade: 2 },
    { id: 2, nome: "X-Bacon", categoria: "Lanches", preco: 18.5, quantidade: 8 },
    { id: 3, nome: "Refrigerante Cola", categoria: "Bebidas", preco: 5, quantidade: 5 },
    { id: 4, nome: "Suco de Laranja", categoria: "Bebidas", preco: 7.5, quantidade: 3 },
    { id: 5, nome: "Batata Frita", categoria: "Acompanhamentos", preco: 12, quantidade: 1 },
  ]);

  const adicionarProduto = () => {
    const nome = prompt("Digite o nome do produto");
    if (!nome) return;

    const categoria = prompt("Digite a categoria do produto");
    if (!categoria) return;

    const precoInput = prompt("Digite o preço do produto");
    if (!precoInput) return;
    const preco = Number(precoInput);
    if (isNaN(preco)) return;

    const quantidadeInput = prompt("Digite a quantidade do produto");
    if (!quantidadeInput) return;
    const quantidade = Number(quantidadeInput);
    if (isNaN(quantidade)) return;

    const novoProduto: Produto = {
      id: Date.now(),
      nome,
      categoria,
      preco,
      quantidade,
    };

    setProdutos([...produtos, novoProduto]);
  };

  const editarProduto = (id: number) => {
    const produto = produtos.find((p) => p.id === id);
    if (!produto) return;

    const novoNome = prompt("Edite o nome do produto", produto.nome);
    if (!novoNome) return;

    const precoInput = prompt("Edite o preço", produto.preco.toString());
    if (!precoInput) return;
    const novoPreco = Number(precoInput);

    const quantidadeInput = prompt("Edite a quantidade", produto.quantidade.toString());
    if (!quantidadeInput) return;
    const novaQuantidade = Number(quantidadeInput);

    setProdutos(
      produtos.map((p) =>
        p.id === id
          ? { ...p, nome: novoNome, preco: novoPreco, quantidade: novaQuantidade }
          : p
      )
    );
  };

  const excluirProduto = (id: number) => {
    if (window.confirm("Deseja realmente excluir este produto?")) {
      setProdutos(produtos.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="p-8 bg-[#fdfbf8] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestão de Produtos</h1>
        <button
          onClick={adicionarProduto}
          className="flex items-center gap-2 bg-[#f97316] text-white px-4 py-2 rounded-xl shadow hover:bg-[#ea580c] transition"
        >
          <Plus size={18} /> Novo Produto
        </button>
      </div>

      <p className="text-gray-500 mb-8">
        Gerencie o cardápio e controle o estoque
      </p>

      {produtos.length === 0 ? (
        <p className="text-gray-400 text-center mt-12">Nenhum produto cadastrado</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative"
            >
              <div className="absolute top-4 right-4">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    produto.quantidade <= 2
                      ? "bg-red-100 text-red-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {produto.quantidade} un.
                </span>
              </div>

              <h2 className="text-lg font-semibold text-gray-800">
                {produto.nome}
              </h2>
              <p className="text-sm text-gray-500 mb-2">{produto.categoria}</p>

              <p className="text-xl font-bold text-orange-600 mb-2">
                R$ {produto.preco.toFixed(2)}
              </p>

              <p className="flex items-center text-gray-500 text-sm mb-4">
                <Package size={14} className="mr-1" /> Estoque: {produto.quantidade}
              </p>

              <div className="flex justify-between">
                <button
                  onClick={() => editarProduto(produto.id)}
                  className="flex items-center gap-1 text-gray-600 bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200 transition"
                >
                  <Pencil size={14} /> Editar
                </button>
                <button
                  onClick={() => excluirProduto(produto.id)}
                  className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-lg hover:bg-red-100 transition"
                >
                  <Trash2 size={14} /> Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Produtos;
