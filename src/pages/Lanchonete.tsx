import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import CartButton from "../components/CartButton"; 

// Tipagem do produto
export type Produto = {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  categoria: string;
  quantidade?: number;
};

// 📸 Imagens
import xBurguer from "../assets/x-burguer.png";
import xSalada from "../assets/x-salada.png";
import xBacon from "../assets/x-bacon.png";
import batataFrita from "../assets/batatafrita.png";
import nuggets from "../assets/nuggets.png";
import refrigerante from "../assets/refrigerante.png";
import suco from "../assets/suco.png";
import agua from "../assets/agua.png";

const produtos: Produto[] = [
  // 🍔 Lanches
  { id: 2, nome: "X-Salada", preco: 12, imagem: xSalada, categoria: "Lanches" },
  { id: 1, nome: "X-Burguer", preco: 15, imagem: xBurguer, categoria: "Lanches" },
  { id: 3, nome: "X-Bacon", preco: 20, imagem: xBacon, categoria: "Lanches" },

  // 🍟 Acompanhamentos
  { id: 4, nome: "Batata Frita", preco: 9.9, imagem: batataFrita, categoria: "Acompanhamentos" },
  { id: 5, nome: "Nuggets", preco: 12.5, imagem: nuggets, categoria: "Acompanhamentos" },

  // 🥤 Bebidas
  { id: 6, nome: "Refrigerante", preco: 6.5, imagem: refrigerante, categoria: "Bebidas" },
  { id: 7, nome: "Suco Natural", preco: 8.0, imagem: suco, categoria: "Bebidas" },
  { id: 8, nome: "Água Mineral", preco: 4.5, imagem: agua, categoria: "Bebidas" },
];

const Lanchonete = () => {
  const [carrinho, setCarrinho] = useState<Produto[]>([]);

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho((prev) => {
      const existe = prev.find((item) => item.id === produto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: (item.quantidade || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (id: number) => {
    setCarrinho((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantidade: (item.quantidade || 1) - 1 }
            : item
        )
        .filter((item) => (item.quantidade || 0) > 0)
    );
  };

  // Agrupar produtos por categoria
  const categorias = [...new Set(produtos.map((p) => p.categoria))];

  return (
    <div className="p-6 bg-gradient-to-b from-orange-100 to-yellow-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-orange-700 mb-6">
        🍔 Cardápio da Lanchonete
      </h1>

      {categorias.map((cat) => (
        <div key={cat} className="mb-10">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">{cat}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {produtos
              .filter((p) => p.categoria === cat)
              .map((produto) => (
                <div
                  key={produto.id}
                  className="bg-white rounded-2xl shadow-md p-4 text-center transition hover:scale-105"
                >
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-orange-400"
                  />
                  <h3 className="text-lg font-semibold mt-3">{produto.nome}</h3>
                  <p className="text-orange-600 font-bold mt-1">
                    R$ {produto.preco.toFixed(2)}
                  </p>
                  <button
                    onClick={() => adicionarAoCarrinho(produto)}
                    className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                  >
                    Adicionar
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* 🛒 Botão fixo com modal do carrinho */}
      <CartButton
        carrinho={carrinho}
        removerDoCarrinho={removerDoCarrinho}
        adicionarAoCarrinho={adicionarAoCarrinho}
      />
    </div>
  );
};

export default Lanchonete;
