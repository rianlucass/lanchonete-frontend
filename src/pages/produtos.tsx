import { Plus, Pencil, Trash2, Package } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const categories = ["SALGADOS", "DOCES", "SANDUICHES", "SAUDAVEIS", "BEBIDAS"];


const Produtos = () => {
  const [activeCategory, setActiveCategory] = useState("SALGADOS");
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Carregar produtos ao trocar categoria
  useEffect(() => {
    fetchProdutos(activeCategory);
  }, [activeCategory]);

  const fetchProdutos = async (category: string) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:8080/product/category/${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProdutos(response.data);

    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] py-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Gestão de Produtos
            </h1>
            <p className="text-sm text-gray-500">
              Gerencie o cardápio e controle o estoque
            </p>
          </div>

          <button className="flex items-center gap-2 bg-orange-600 text-white px-5 py-3 rounded-lg shadow hover:bg-orange-700 transition">
            <Plus className="w-5 h-5" />
            Novo Produto
          </button>
        </div>

        {/* CATEGORIAS */}
        <div className="flex gap-4 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium border transition
                ${activeCategory === cat
                  ? "bg-orange-600 text-white border-orange-600 shadow"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* LISTAGEM */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin h-10 w-10 border-4 border-orange-600 border-t-transparent rounded-full"></div>
          </div>
        ) : produtos.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center text-gray-400">
            <Package className="w-14 h-14 mb-4 opacity-40" />
            <h2 className="text-xl font-medium">Nenhum produto nesta categoria</h2>
            <p className="text-sm">
              Clique em “Novo Produto” para adicionar um item.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

            {produtos.map((produto) => (
              <div
                key={produto.id}
                className="bg-white rounded-xl shadow-sm p-5 border border-[#ECEBE8] hover:shadow-md transition"
              >
                {/* IMAGEM DO PRODUTO */}
                <div className="w-full h-40 bg-gray-100 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                  {produto.imageURL ? (
                    <img
                      src={`http://localhost:8080/uploads/${produto.imageURL}`}
                      alt={produto.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package className="w-12 h-12 text-gray-400" />
                  )}
                </div>

                {/* Nome e categoria */}
                <h2 className="text-lg font-semibold text-gray-900">
                  {produto.name}
                </h2>
                <p className="text-xs text-gray-500">{produto.category}</p>

                {/* Preço */}
                <p className="mt-3 text-xl font-bold text-orange-600">
                  $ {Number(produto.price).toFixed(2)}
                </p>

                {/* Estoque */}
                <p className="text-sm mt-1 text-gray-600">
                  Estoque:{" "}
                  <span className="font-medium">{produto.stock ?? 0}</span>
                </p>

                {/* Ações */}
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition">
                    <Pencil className="w-4 h-4" />
                    Editar
                  </button>

                  <button className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Produtos;
