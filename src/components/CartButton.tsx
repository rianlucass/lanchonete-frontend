import { useState, useEffect } from "react";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import Button from "./button";
import { type Produto } from "../pages/Lanchonete";

interface CartButtonProps {
  carrinho: Produto[];
  removerDoCarrinho: (id: number) => void;
  adicionarAoCarrinho: (produto: Produto) => void;
}

const CartButton = ({ carrinho, removerDoCarrinho, adicionarAoCarrinho }: CartButtonProps) => {
  const [open, setOpen] = useState(false);

  const total = carrinho.reduce((acc, item) => acc + item.preco * (item.quantidade || 0), 0);
  const quantidadeTotal = carrinho.reduce((acc, item) => acc + (item.quantidade || 0), 0);

  // Evitar scroll atrás do modal
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      {/* Botão fixo no topo */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 bg-orange-600 text-white p-3 rounded-full shadow-lg flex items-center gap-2 z-50 hover:bg-orange-700 transition"
      >
        <ShoppingCart />
        <span className="text-sm font-bold">{quantidadeTotal}</span>
      </button>

      {/* Modal do carrinho */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
          <div className="bg-white w-80 h-full p-5 shadow-xl relative overflow-y-auto">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <ShoppingCart /> Seu Carrinho
            </h2>

            {carrinho.length === 0 ? (
              <p className="text-gray-500">Seu carrinho está vazio 🛒</p>
            ) : (
              carrinho.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b py-2">
                  <span>{item.nome}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removerDoCarrinho(item.id)}
                      className="bg-gray-300 px-2 rounded-full"
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.quantidade}</span>
                    <button
                      onClick={() => adicionarAoCarrinho(item)}
                      className="bg-orange-400 px-2 rounded-full text-white"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}

            {carrinho.length > 0 && (
              <>
                <p className="mt-4 font-bold text-orange-700">
                  Total: R$ {total.toFixed(2)}
                </p>
                <Button text="Finalizar Compra" onClick={() => alert("Compra finalizada!")} />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartButton;
