import { useState } from "react";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([
    { id: 1, nome: "Hambúrguer Especial", preco: 20, quantidade: 10 },
    { id: 2, nome: "Refrigerante Cola", preco: 5, quantidade: 15 },
    { id: 3, nome: "Batata Frita", preco: 10, quantidade: 8 },
  ]);

  const adicionarProduto = () => {
    const nome = prompt("Digite o nome do produto");
    if (!nome) return;

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

    const precoInput = prompt("Edite o preço do produto", produto.preco.toString());
    if (!precoInput) return;
    const novoPreco = Number(precoInput);
    if (isNaN(novoPreco)) return;

    const quantidadeInput = prompt("Edite a quantidade", produto.quantidade.toString());
    if (!quantidadeInput) return;
    const novaQuantidade = Number(quantidadeInput);
    if (isNaN(novaQuantidade)) return;

    setProdutos(
      produtos.map((p) =>
        p.id === id ? { ...p, nome: novoNome, preco: novoPreco, quantidade: novaQuantidade } : p
      )
    );
  };

  const excluirProduto = (id: number) => {
    if (window.confirm("Deseja realmente excluir este produto?")) {
      setProdutos(produtos.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Produtos</h1>

      <button
        onClick={adicionarProduto}
        className="mb-6 px-6 py-3 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition"
      >
        Adicionar Produto
      </button>

      {produtos.length === 0 ? (
        <p className="text-gray-400 text-center mt-12">Nenhum produto cadastrado</p>
      ) : (
        <ul className="space-y-4">
          {produtos.map((produto) => (
            <li
              key={produto.id}
              className="flex justify-between items-center p-4 bg-white rounded-lg shadow"
            >
              <span>
                {produto.nome} - R$ {produto.preco.toFixed(2)} | Estoque: {produto.quantidade}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => editarProduto(produto.id)}
                  className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => excluirProduto(produto.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Produtos;
