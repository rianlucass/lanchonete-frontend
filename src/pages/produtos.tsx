import React, { useState } from "react";
import { Package, Plus, Trash2, Edit } from "lucide-react";

function Produtos() {
  const [produtos, setProdutos] = useState([
    { id: 1, nome: "Hambúrguer Especial", preco: 22.90, estoque: 12 },
    { id: 2, nome: "Refrigerante Cola", preco: 6.50, estoque: 30 },
    { id: 3, nome: "Batata Frita", preco: 9.00, estoque: 8 },
  ]);

  return (
    <div className="min-h-screen bg-orange-50 p-8 flex flex-col items-center">

      {/* Título da página */}
      <div className="w-full max-w-5xl bg-orange-600 text-white p-6 rounded-2xl shadow-md text-center">
        <h1 className="text-2xl font-bold">Gerenciar Produtos</h1>
        <p className="text-orange-200 mt-1">
          Aqui você controla todos os produtos da sua lanchonete
        </p>
      </div>

      {/* Botão adicionar */}
      <div className="w-full max-w-5xl mt-6 flex justify-end">
        <button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-xl font-medium shadow-md transition">
          <Plus className="w-5 h-5" />
          Novo Produto
        </button>
      </div>

      {/* Lista de produtos */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md mt-6 p-6">
        <h2 className="text-lg font-semibold text-orange-700 mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-orange-600" />
          Lista de Produtos
        </h2>

        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-gray-600">
              <th className="py-2">Nome</th>
              <th className="py-2">Preço</th>
              <th className="py-2">Estoque</th>
              <th className="py-2 text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            {produtos.map((p) => (
              <tr key={p.id} className="bg-orange-50 hover:bg-orange-100 transition rounded-xl shadow-sm">
                <td className="py-3 px-3 font-bold text-gray-800">{p.nome}</td>
                <td className="py-3 px-3 text-gray-700">R$ {p.preco.toFixed(2)}</td>
                <td className="py-3 px-3 text-gray-700">{p.estoque}</td>

                <td className="py-3 px-3">
                  <div className="flex justify-center gap-3">
                    <button className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition">
                      <Edit className="text-blue-600" size={18} />
                    </button>

                    <button className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition">
                      <Trash2 className="text-red-600" size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default Produtos;
