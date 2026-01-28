import { useState, useEffect } from "react";
import { Package, RotateCcw, AlertTriangle, TrendingUp, TrendingDown, Clock, User } from "lucide-react";
import { stockService } from "../service/stock/stockService";
import type { StockMovement, StockSummary } from "../service/stock/stockService";
import axios from "axios";

interface Product {
  id: string;
  name: string;
  category: string;
  imageURL: string;
}

type OperationType = "ENTRY" | "EXIT" | "ADJUSTMENT" | "LOSS";

const Estoque = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [stockSummary, setStockSummary] = useState<StockSummary | null>(null);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"summary" | "movements">("summary");
  const [operationType, setOperationType] = useState<OperationType>("ENTRY");

  const [formData, setFormData] = useState({
    quantity: "",
    targetQuantity: "",
    reason: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Carregar todos os produtos
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Ao selecionar produto, carregar estoque e movimentações
  useEffect(() => {
    if (selectedProduct) {
      fetchProductStock();
      fetchProductMovements();
    }
  }, [selectedProduct]);

  const fetchAllProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const categories = ["SALGADOS", "DOCES", "SANDUICHES", "SAUDAVEIS", "BEBIDAS"];
      
      const allProducts: Product[] = [];
      for (const category of categories) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/product/category/${category}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        allProducts.push(...response.data);
      }
      
      setProducts(allProducts);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  const fetchProductStock = async () => {
    if (!selectedProduct) return;
    
    try {
      const response = await stockService.getProductStock(selectedProduct.id);
      setStockSummary(response.data);
    } catch (error: unknown) {
      // Se produto não tem estoque ainda, inicializar com valores zerados
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setStockSummary({
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          currentStock: 0,
          totalEntries: 0,
          totalExits: 0,
          totalAdjustments: 0,
          totalLosses: 0,
        });
      } else {
        console.error("Erro ao carregar estoque:", error);
      }
    }
  };

  const fetchProductMovements = async () => {
    if (!selectedProduct) return;
    
    try {
      const response = await stockService.getProductMovements(selectedProduct.id);
      setMovements(response.data);
    } catch (error: unknown) {
      // Se produto não tem movimentações ainda, inicializar array vazio
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setMovements([]);
      } else {
        console.error("Erro ao carregar movimentações:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      switch (operationType) {
        case "ENTRY":
          await stockService.registerEntry({
            productId: selectedProduct.id,
            quantity: Number(formData.quantity),
            reason: formData.reason,
          });
          setSuccessMessage("Entrada registrada com sucesso!");
          break;

        case "EXIT":
          await stockService.registerExit({
            productId: selectedProduct.id,
            quantity: Number(formData.quantity),
            reason: formData.reason,
          });
          setSuccessMessage("Saída registrada com sucesso!");
          break;

        case "ADJUSTMENT":
          await stockService.registerAdjustment({
            productId: selectedProduct.id,
            targetQuantity: Number(formData.targetQuantity),
            reason: formData.reason,
          });
          setSuccessMessage("Ajuste registrado com sucesso!");
          break;

        case "LOSS":
          await stockService.registerLoss({
            productId: selectedProduct.id,
            quantity: Number(formData.quantity),
            reason: formData.reason,
          });
          setSuccessMessage("Perda registrada com sucesso!");
          break;
      }

      // Limpar formulário
      setFormData({ quantity: "", targetQuantity: "", reason: "" });
      
      // Recarregar dados
      await fetchProductStock();
      await fetchProductMovements();

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || 
          error.response?.data?.error ||
          "Erro ao registrar movimentação"
        );
      } else {
        setErrorMessage("Erro ao registrar movimentação");
      }
    } finally {
      setLoading(false);
    }
  };

  const getMovementIcon = (type: OperationType) => {
    switch (type) {
      case "ENTRY": return <TrendingUp className="w-5 h-5 text-green-600" />;
      case "EXIT": return <TrendingDown className="w-5 h-5 text-red-600" />;
      case "ADJUSTMENT": return <RotateCcw className="w-5 h-5 text-blue-600" />;
      case "LOSS": return <AlertTriangle className="w-5 h-5 text-orange-600" />;
    }
  };

  const getMovementLabel = (type: OperationType) => {
    switch (type) {
      case "ENTRY": return "Entrada";
      case "EXIT": return "Saída";
      case "ADJUSTMENT": return "Ajuste";
      case "LOSS": return "Perda";
    }
  };

  const getMovementColor = (type: OperationType) => {
    switch (type) {
      case "ENTRY": return "bg-green-100 text-green-800";
      case "EXIT": return "bg-red-100 text-red-800";
      case "ADJUSTMENT": return "bg-blue-100 text-blue-800";
      case "LOSS": return "bg-orange-100 text-orange-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Gerenciamento de Estoque</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* SELEÇÃO DE PRODUTO */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Selecionar Produto</h2>
              
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className={`w-full text-left p-3 rounded-lg border transition ${
                      selectedProduct?.id === product.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-orange-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {product.imageURL ? (
                        <img
                          src={`${import.meta.env.VITE_API_URL}/uploads/${product.imageURL}`}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* PAINEL PRINCIPAL */}
          <div className="lg:col-span-2">
            {!selectedProduct ? (
              <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-200 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Selecione um produto para gerenciar o estoque</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* CABEÇALHO DO PRODUTO */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center gap-4">
                    {selectedProduct.imageURL ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL}/uploads/${selectedProduct.imageURL}`}
                        alt={selectedProduct.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="w-10 h-10 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
                      <p className="text-gray-500">{selectedProduct.category}</p>
                    </div>
                  </div>

                  {/* ESTOQUE ATUAL */}
                  {stockSummary && (
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Estoque Atual</p>
                        <p className="text-2xl font-bold text-gray-900">{stockSummary.currentStock}</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <p className="text-xs text-green-700 mb-1">Entradas</p>
                        <p className="text-2xl font-bold text-green-700">{stockSummary.totalEntries}</p>
                      </div>
                      <div className="bg-red-50 rounded-lg p-4">
                        <p className="text-xs text-red-700 mb-1">Saídas</p>
                        <p className="text-2xl font-bold text-red-700">{stockSummary.totalExits}</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-xs text-blue-700 mb-1">Ajustes</p>
                        <p className="text-2xl font-bold text-blue-700">{stockSummary.totalAdjustments}</p>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-4">
                        <p className="text-xs text-orange-700 mb-1">Perdas</p>
                        <p className="text-2xl font-bold text-orange-700">{stockSummary.totalLosses}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* TABS */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="border-b border-gray-200">
                    <div className="flex gap-4 px-6">
                      <button
                        onClick={() => setActiveTab("summary")}
                        className={`py-4 px-2 border-b-2 font-medium transition ${
                          activeTab === "summary"
                            ? "border-orange-500 text-orange-600"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        Registrar Movimentação
                      </button>
                      <button
                        onClick={() => setActiveTab("movements")}
                        className={`py-4 px-2 border-b-2 font-medium transition ${
                          activeTab === "movements"
                            ? "border-orange-500 text-orange-600"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        Histórico de Movimentações
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    {activeTab === "summary" ? (
                      <div>
                        {/* SELETOR DE TIPO DE OPERAÇÃO */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                          <button
                            onClick={() => setOperationType("ENTRY")}
                            className={`p-4 rounded-lg border-2 transition ${
                              operationType === "ENTRY"
                                ? "border-green-500 bg-green-50"
                                : "border-gray-200 hover:border-green-300"
                            }`}
                          >
                            <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-900">Entrada</p>
                          </button>
                          <button
                            onClick={() => setOperationType("EXIT")}
                            className={`p-4 rounded-lg border-2 transition ${
                              operationType === "EXIT"
                                ? "border-red-500 bg-red-50"
                                : "border-gray-200 hover:border-red-300"
                            }`}
                          >
                            <TrendingDown className="w-6 h-6 text-red-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-900">Saída</p>
                          </button>
                          <button
                            onClick={() => setOperationType("ADJUSTMENT")}
                            className={`p-4 rounded-lg border-2 transition ${
                              operationType === "ADJUSTMENT"
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-blue-300"
                            }`}
                          >
                            <RotateCcw className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-900">Ajuste</p>
                          </button>
                          <button
                            onClick={() => setOperationType("LOSS")}
                            className={`p-4 rounded-lg border-2 transition ${
                              operationType === "LOSS"
                                ? "border-orange-500 bg-orange-50"
                                : "border-gray-200 hover:border-orange-300"
                            }`}
                          >
                            <AlertTriangle className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-900">Perda</p>
                          </button>
                        </div>

                        {/* MENSAGENS */}
                        {successMessage && (
                          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                            {successMessage}
                          </div>
                        )}
                        {errorMessage && (
                          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {errorMessage}
                          </div>
                        )}

                        {/* FORMULÁRIO */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                          {operationType === "ADJUSTMENT" ? (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quantidade Desejada
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={formData.targetQuantity}
                                onChange={(e) => setFormData({ ...formData, targetQuantity: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                Estoque atual: {stockSummary?.currentStock || 0}
                              </p>
                            </div>
                          ) : (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quantidade
                              </label>
                              <input
                                type="number"
                                min="1"
                                value={formData.quantity}
                                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                              />
                            </div>
                          )}

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Motivo/Observação
                            </label>
                            <textarea
                              value={formData.reason}
                              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                              rows={3}
                              placeholder="Descreva o motivo desta movimentação..."
                              required
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
                          >
                            {loading ? "Processando..." : `Registrar ${getMovementLabel(operationType)}`}
                          </button>
                        </form>
                      </div>
                    ) : (
                      <div>
                        {/* HISTÓRICO DE MOVIMENTAÇÕES */}
                        {movements.length === 0 ? (
                          <p className="text-center text-gray-500 py-8">Nenhuma movimentação registrada</p>
                        ) : (
                          <div className="space-y-3 max-h-[500px] overflow-y-auto">
                            {movements.map((movement) => (
                              <div
                                key={movement.id}
                                className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition"
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex items-start gap-3">
                                    {getMovementIcon(movement.movementType)}
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMovementColor(movement.movementType)}`}>
                                          {getMovementLabel(movement.movementType)}
                                        </span>
                                        <span className="text-lg font-bold text-gray-900">
                                          {movement.movementType === "EXIT" || movement.movementType === "LOSS" ? "-" : "+"}
                                          {movement.quantity}
                                        </span>
                                      </div>
                                      <p className="text-sm text-gray-700 mb-2">{movement.reason}</p>
                                      <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <div className="flex items-center gap-1">
                                          <Clock className="w-3 h-3" />
                                          {new Date(movement.dateTime).toLocaleString("pt-BR")}
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <User className="w-3 h-3" />
                                          {movement.responsibleUser}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estoque;
