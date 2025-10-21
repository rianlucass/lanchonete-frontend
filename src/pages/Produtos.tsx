import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import Button from "../components/button";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

const Produtos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    preco: "",
    estoque: "",
  });
  const [editando, setEditando] = useState<Produto | null>(null);

  const handleAdicionar = () => {
    if (!novoProduto.nome || !novoProduto.preco || !novoProduto.estoque) {
      alert("Preencha todos os campos!");
      return;
    }

    const produto: Produto = {
      id: Date.now(),
      nome: novoProduto.nome,
      preco: parseFloat(novoProduto.preco),
      estoque: parseInt(novoProduto.estoque),
    };

    setProdutos([...produtos, produto]);
    setNovoProduto({ nome: "", preco: "", estoque: "" });
  };

  const handleRemover = (id: number) => {
    setProdutos(produtos.filter((p) => p.id !== id));
  };

  const handleEditar = (produto: Produto) => {
    setEditando(produto);
    setNovoProduto({
      nome: produto.nome,
      preco: produto.preco.toString(),
      estoque: produto.estoque.toString(),
    });
  };

  const handleSalvarEdicao = () => {
    if (!editando) return;

    const produtosAtualizados = produtos.map((p) =>
      p.id === editando.id
        ? {
            ...p,
            nome: novoProduto.nome,
            preco: parseFloat(novoProduto.preco),
            estoque: parseInt(novoProduto.estoque),
          }
        : p
    );

    setProdutos(produtosAtualizados);
    setEditando(null);
    setNovoProduto({ nome: "", preco: "", estoque: "" });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold text-orange-600 mb-4 text-center">
        Gerenciar Produtos 
      </h1>

      {/* Formulário */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Nome do produto"
          className="border rounded-lg px-3 py-2"
          value={novoProduto.nome}
          onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
        />
        <input
          type="number"
          placeholder="Preço"
          className="border rounded-lg px-3 py-2"
          value={novoProduto.preco}
          onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
        />
        <input
          type="number"
          placeholder="Estoque"
          className="border rounded-lg px-3 py-2"
          value={novoProduto.estoque}
          onChange={(e) => setNovoProduto({ ...novoProduto, estoque: e.target.value })}
        />
      </div>

      {editando ? (
        <Button text="Salvar Edição" onClick={handleSalvarEdicao} />
      ) : (
        <Button text="Adicionar Produto" onClick={handleAdicionar} />
      )}

      {/* Lista de produtos */}
      <table className="w-full mt-6 border-collapse border border-gray-300">
        <thead className="bg-orange-100">
          <tr>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Preço</th>
            <th className="border p-2">Estoque</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id} className="text-center">
              <td className="border p-2">{p.nome}</td>
              <td className="border p-2">R$ {p.preco.toFixed(2)}</td>
              <td className="border p-2">{p.estoque}</td>
              <td className="border p-2 flex justify-center gap-3">
                <button
                  onClick={() => handleEditar(p)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit />
                </button>
                <button
                  onClick={() => handleRemover(p.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {produtos.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          Nenhum produto cadastrado ainda 
        </p>
      )}
    </div>
  );
};

export default Produtos;
