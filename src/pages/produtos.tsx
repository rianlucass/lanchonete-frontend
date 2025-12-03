import { Plus, Pencil, Trash2, Package, Upload, ChevronUp, ChevronDown, X, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const categories = ["SALGADOS", "DOCES", "SANDUICHES", "SAUDAVEIS", "BEBIDAS"];


const Produtos = () => {
  const [activeCategory, setActiveCategory] = useState("SALGADOS");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editingProduct, setEditingProduct] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deleteModal, setDeleteModal] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "SALGADOS",
    stock: "",
    description: "",
    image: null as File | null
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState(false);

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

  // Abrir modal para criar novo produto
  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      price: "",
      category: activeCategory,
      stock: "",
      description: "",
      image: null
    });
    setImagePreview(null);
    setShowModal(true);
  };

  // Abrir modal para editar produto
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openEditModal = (produto: any) => {
    setEditingProduct(produto);
    setFormData({
      name: produto.name,
      price: produto.price,
      category: produto.category,
      stock: produto.stock,
      description: produto.description || "",
      image: null
    });
    setImagePreview(produto.imageURL ? `http://localhost:8080/uploads/${produto.imageURL}` : null);
    setShowModal(true);
  };

  // INPUT NORMAL
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // INPUT FILE
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({
      ...prev,
      image: file
    }));

    if (file) {
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
    }
  };

  // Funções para incrementar/decrementar preço
  const incrementPrice = () => {
    const currentPrice = parseFloat(formData.price) || 0;
    setFormData(prev => ({
      ...prev,
      price: (currentPrice + 0.5).toFixed(2)
    }));
  };

  const decrementPrice = () => {
    const currentPrice = parseFloat(formData.price) || 0;
    if (currentPrice >= 0.5) {
      setFormData(prev => ({
        ...prev,
        price: (currentPrice - 0.5).toFixed(2)
      }));
    }
  };

  // ENVIAR FORM (CREATE OU UPDATE)
  const submitProduct = async () => {
    setLoadingAction(true);
    const token = localStorage.getItem("token");
    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("stock", formData.stock);
    formDataToSend.append("description", formData.description);

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      if (editingProduct) {
        // EDITAR PRODUTO
        await axios.put(`http://localhost:8080/product/${editingProduct.id}`, formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // CRIAR PRODUTO
        await axios.post("http://localhost:8080/product", formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setShowModal(false);
      setImagePreview(null);
      setEditingProduct(null);

      // Resetar formulário
      setFormData({
        name: "",
        price: "",
        category: activeCategory,
        stock: "",
        description: "",
        image: null
      });

      // Recarregar produtos
      fetchProdutos(activeCategory);

    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    } finally {
      setLoadingAction(false);
    }
  };

  // EXCLUIR PRODUTO
  const confirmDelete = async () => {
    if (!deleteModal) return;
    
    setLoadingAction(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/product/${deleteModal.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Recarregar produtos
      fetchProdutos(activeCategory);
      setDeleteModal(null);
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    } finally {
      setLoadingAction(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setImagePreview(null);
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
            onClick={openCreateModal}
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
                  <span className={`font-medium ${produto.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                    {produto.stock ?? 0}
                  </span>
                </p>

                {/* Descrição (condicional) */}
                {produto.description && (
                  <p className="text-sm mt-2 text-gray-600 line-clamp-2">
                    {produto.description}
                  </p>
                )}

                {/* Ações */}
                <div className="mt-4 flex gap-2">
                  <button 
                    onClick={() => openEditModal(produto)}
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    <Pencil className="w-4 h-4" />
                    Editar
                  </button>

                  <button 
                    onClick={() => setDeleteModal(produto)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MODAL DE NOVO/EDITAR PRODUTO */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
              
              {/* HEADER DO MODAL */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingProduct ? 'Editar Produto' : 'Novo Produto'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  disabled={loadingAction}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* FORMULÁRIO */}
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome do Produto
                    </label>
                    <input
                      name="name"
                      placeholder="Ex: Coxinha de Frango"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  {/* Input de Preço com Seletor de Números */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preço
                    </label>
                    <div className="relative">
                      <div className="flex items-center">
                        <span className="absolute left-3 text-gray-500">R$</span>
                        <input
                          name="price"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={formData.price}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoria
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estoque
                    </label>
                    <input
                      name="stock"
                      type="number"
                      placeholder="Quantidade em estoque"
                      value={formData.stock}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição
                    </label>
                    <textarea
                      name="description"
                      placeholder="Descreva o produto..."
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  {/* Upload de Imagem Estilizado */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Imagem do Produto
                      {editingProduct && (
                        <span className="text-xs text-gray-500 ml-2">
                          (Deixe em branco para manter a imagem atual)
                        </span>
                      )}
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
                            <span className="text-white ml-2">
                              {editingProduct ? 'Alterar imagem' : 'Trocar imagem'}
                            </span>
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

                {/* BOTÕES */}
                <div className="flex justify-end mt-6 gap-3">
                  <button
                    onClick={closeModal}
                    disabled={loadingAction}
                    className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={submitProduct}
                    disabled={loadingAction}
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loadingAction && (
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    )}
                    {editingProduct ? 'Atualizar Produto' : 'Salvar Produto'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
        {deleteModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg">
              
              {/* HEADER DO MODAL */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Confirmar Exclusão
                </h2>
                <button
                  onClick={() => setDeleteModal(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  disabled={loadingAction}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* CONTEÚDO */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  {deleteModal.imageURL ? (
                    <img
                      src={`http://localhost:8080/uploads/${deleteModal.imageURL}`}
                      alt={deleteModal.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">{deleteModal.name}</h3>
                    <p className="text-sm text-gray-500">{deleteModal.category}</p>
                    <p className="text-lg font-bold text-orange-600">
                      R$ {Number(deleteModal.price).toFixed(2)}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 mb-2">
                  Tem certeza que deseja excluir <strong>{deleteModal.name}</strong>?
                </p>
                <p className="text-sm text-red-600 font-medium">
                  Esta ação não pode ser desfeita!
                </p>
              </div>

              {/* BOTÕES */}
              <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setDeleteModal(null)}
                  disabled={loadingAction}
                  className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>

                <button
                  onClick={confirmDelete}
                  disabled={loadingAction}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loadingAction && (
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  )}
                  Excluir Produto
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