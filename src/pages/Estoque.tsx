import { useState } from "react";
import { Plus, Minus, Package } from "lucide-react";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  estoque: number;
}

const Estoque = () => {
  const [produtos, setProdutos] = useState<Produto[]>([
    { id: 1, nome: "X-Burguer", preco: 15, categoria: "Lanches", estoque: 10 },
    { id: 2, nome: "X-Salada", preco: 12, categoria: "Lanches", estoque: 8 },
    { id: 3, nome: "Batata Frita", preco: 9.9, categoria: "Acompanhamentos", estoque: 15 },
  ]);

  const aumentarEstoque = (id: number) => {
    setProdutos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, estoque: p.estoque + 1 } : p
      )
    );
  };

  const diminuirEstoque = (id: number) => {
    setProdutos((prev) =>
      prev.map((p) =>
        p.id === id && p.estoque > 0 ? { ...p, estoque: p.estoque - 1 } : p
      )
    );
  };

  return (
    <div className="p-8 bg-gradient-to-b from-yellow-50 to-orange-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-orange-700 mb-6 flex items-center justify-center gap-2">
        <Package /> Controle de Estoque
      </h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl p-5">
        <table className="w-full text-center border-collapse">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Produto</th>
              <th className="p-3">Categoria</th>
              <th className="p-3">Preço</th>
              <th className="p-3">Estoque</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id} className="border-b hover:bg-orange-50 transition">
                <td className="p-3">{produto.id}</td>
                <td className="p-3 font-semibold">{produto.nome}</td>
                <td className="p-3">{produto.categoria}</td>
                <td className="p-3 text-orange-600 font-bold">
                  R$ {produto.preco.toFixed(2)}
                </td>
                <td className="p-3">{produto.estoque}</td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => diminuirEstoque(produto.id)}
                    className="bg-gray-300 px-2 rounded-full hover:bg-gray-400 transition"
                  >
                    <Minus size={16} />
                  </button>
                  <button
                    onClick={() => aumentarEstoque(produto.id)}
                    className="bg-orange-500 text-white px-2 rounded-full hover:bg-orange-600 transition"
                  >
                    <Plus size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Estoque;
