import { Plus, Pencil, Trash2, Package, Upload, ChevronUp, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const categories = ["SALGADOS", "DOCES", "SANDUICHES", "SAUDAVEIS", "BEBIDAS"];

const Produtos = () => {
  const [activeCategory, setActiveCategory] = useState("SALGADOS");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "SALGADOS",
    stock: "",
    description: "",
    image: null as File | null
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  // INPUT NORMAL
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // INPUT FILE
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImage = (e: any) => {
    const file = e.target.files?.[0];

    setNewProduct((prev) => ({
      ...prev,
      image: file
    }));

    if (file) {
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
    }
  };

  // ENVIAR FORM
  const submitProduct = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("category", newProduct.category);
    formData.append("stock", newProduct.stock);
    formData.append("description", newProduct.description);

    if (newProduct.image) {
      formData.append("image", newProduct.image);
    }

    try {
      await axios.post("http://localhost:8080/product", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setShowModal(false);
      setImagePreview(null);

      // Resetar formulário
      setNewProduct({
        name: "",
        price: "",
        category: activeCategory,
        stock: "",
        description: "",
        image: null
      });

      fetchProdutos(activeCategory);

    } catch (error) {
      console.error("Erro ao criar produto:", error);
      alert("Erro ao criar produto!");
    }
  };

  // Funções para incrementar/decrementar preço
  const incrementPrice = () => {
    const currentPrice = parseFloat(newProduct.price) || 0;
    setNewProduct(prev => ({
      ...prev,
      price: (currentPrice + 0.5).toFixed(2)
    }));
  };

  const decrementPrice = () => {
    const currentPrice = parseFloat(newProduct.price) || 0;
    if (currentPrice >= 0.5) {
      setNewProduct(prev => ({
        ...prev,
        price: (currentPrice - 0.5).toFixed(2)
      }));
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

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-orange-600 text-white px-5 py-3 rounded-lg shadow hover:bg-orange-700 transition"
          >
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
              Clique em "Novo Produto" para adicionar um item.
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
                  R$ {Number(produto.price).toFixed(2)}
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

        {/* MODAL DE NOVO PRODUTO */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg">

              <h2 className="text-2xl font-bold mb-5 text-gray-800">
                Novo Produto
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <input
                  name="name"
                  placeholder="Nome"
                  value={newProduct.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />

                {/* Input de Preço com Seletor de Números */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preço
                  </label>
                  <div className="flex items-center">
                    <span className="absolute left-3 text-gray-500">R$</span>
                    <input
                      name="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={newProduct.price}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg px-10 py-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <div className="absolute right-2 flex flex-col">
                      <button
                        type="button"
                        onClick={incrementPrice}
                        className="p-1 hover:bg-gray-100 rounded-t-md transition"
                      >
                        <ChevronUp className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        type="button"
                        onClick={decrementPrice}
                        className="p-1 hover:bg-gray-100 rounded-b-md transition"
                      >
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                <select
                  name="category"
                  value={newProduct.category}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <input
                  name="stock"
                  type="number"
                  placeholder="Estoque"
                  value={newProduct.stock}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />

                <textarea
                  name="description"
                  placeholder="Descrição"
                  value={newProduct.description}
                  onChange={handleChange}
                  rows={3}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />

                {/* Upload de Imagem Estilizado */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imagem do Produto
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                          <Upload className="w-8 h-8 text-white" />
                          <span className="text-white ml-2">Alterar imagem</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                          <span className="font-semibold">Clique para upload</span> ou arraste e solte
                        </p>
                        <p className="text-xs text-gray-400">PNG, JPG, JPEG (MAX. 5MB)</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end mt-6 gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>

                <button
                  onClick={submitProduct}
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700 transition"
                >
                  Salvar Produto
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Produtos;