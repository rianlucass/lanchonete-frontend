/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus, Minus, ShoppingCart, Trash2, CheckCircle, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  imageURL?: string;
  description?: string;
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
  category: string;
}

interface OrderResponse {
  id: string;
  dateTime: string;
  clientName: string;
  totalAmount: number;
  paymentMethod: string;
  status: string;
  items: Array<{
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }>;
}

const categories = ["SALGADOS", "DOCES", "SANDUICHES", "SAUDAVEIS", "BEBIDAS"];

const Pedidos = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [clientName, setClientName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("PIX");
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<OrderResponse | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({
    SALGADOS: true,
    DOCES: true,
    SANDUICHES: true,
    SAUDAVEIS: true,
    BEBIDAS: true
  });

  // Carregar produtos da API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/product", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  // Agrupar produtos por categoria
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as { [key: string]: Product[] });

  // Alternar categoria expandida/recolhida
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Adicionar produto ao carrinho
  const addToCart = (product: Product) => {
    if (product.stock <= 0) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === product.id);

      if (existingItem) {
        if (existingItem.quantity >= product.stock) return prevCart;

        return prevCart.map(item =>
          item.productId === product.id
            ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: (item.quantity + 1) * item.price
            }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            subtotal: product.price,
            category: product.category
          }
        ];
      }
    });
  };

  // Remover produto do carrinho
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
  };

  // Atualizar quantidade do produto no carrinho
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    const product = products.find(p => p.id === productId);
    if (product && newQuantity > product.stock) return;

    setCart(prevCart =>
      prevCart.map(item =>
        item.productId === productId
          ? {
            ...item,
            quantity: newQuantity,
            subtotal: newQuantity * item.price
          }
          : item
      )
    );
  };

  // Calcular total do pedido
  const totalAmount = cart.reduce((total, item) => total + item.subtotal, 0);

  // Calcular total por categoria no carrinho
  const cartByCategory = cart.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as { [key: string]: CartItem[] });

  // Finalizar pedido
  const finalizeOrder = async () => {
    if (!clientName.trim()) {
      alert("Por favor, informe o nome do cliente");
      return;
    }

    if (cart.length === 0) {
      alert("Adicione pelo menos um produto ao pedido");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const orderData = {
        clientName: clientName.trim(),
        paymentMethod,
        items: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      };

      const response = await axios.post<OrderResponse>(
        "http://localhost:8080/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      setOrderSuccess(response.data);
      setShowSuccessModal(true);

      // Limpar carrinho e formulário
      setCart([]);
      setClientName("");
      setPaymentMethod("PIX");

      // Recarregar produtos para atualizar estoque
      fetchProducts();

    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      alert("Erro ao finalizar pedido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Verificar se produto está no carrinho
  const getProductInCart = (productId: string) => {
    return cart.find(item => item.productId === productId);
  };

  // Formatar data
  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString('pt-BR');
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] py-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Novo Pedido</h1>
            <p className="text-sm text-gray-500">
              Selecione produtos para adicionar ao pedido
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 text-orange-600 px-3 py-2 rounded-lg font-semibold">
              {cart.length} {cart.length === 1 ? 'item' : 'itens'}
            </div>
            <ShoppingCart className="w-10 h-10 text-orange-600 opacity-70" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LISTA DE PRODUTOS POR CATEGORIA */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {categories.map((category) => {
                const categoryProducts = productsByCategory[category] || [];
                const isExpanded = expandedCategories[category];
                const itemsInCartFromCategory = cart.filter(item => item.category === category).length;

                if (categoryProducts.length === 0) return null;

                return (
                  <div key={category} className="bg-white border border-[#EAE7E2] rounded-xl overflow-hidden">
                    {/* HEADER DA CATEGORIA */}
                    <button
                      onClick={() => toggleCategory(category)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <div className="flex items-center gap-3">
                        <h2 className="text-lg font-bold text-gray-900">{category}</h2>
                        <span className="bg-orange-100 text-orange-600 text-sm px-2 py-1 rounded-full">
                          {categoryProducts.length} produtos
                        </span>
                        {itemsInCartFromCategory > 0 && (
                          <span className="bg-green-100 text-green-600 text-sm px-2 py-1 rounded-full">
                            {itemsInCartFromCategory} no pedido
                          </span>
                        )}
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>

                    {/* PRODUTOS DA CATEGORIA */}
                    {isExpanded && (
                      <div className="p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {categoryProducts.map((product) => {
                            const cartItem = getProductInCart(product.id);
                            const availableStock = product.stock - (cartItem?.quantity || 0);

                            return (
                              <div
                                key={product.id}
                                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                              >
                                {/* Imagem do produto */}
                                <div className="w-full h-24 bg-gray-100 rounded-lg mb-3 overflow-hidden flex items-center justify-center">
                                  {product.imageURL ? (
                                    <img
                                      src={`http://localhost:8080/uploads/${product.imageURL}`}
                                      alt={product.name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <ShoppingCart className="w-6 h-6 text-gray-400" />
                                  )}
                                </div>

                                {/* Nome e estoque */}
                                <div className="flex items-center justify-between mb-2">
                                  <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
                                  <span className={`text-xs px-2 py-1 rounded-md ${availableStock > 5
                                      ? "bg-green-100 text-green-600"
                                      : availableStock > 0
                                        ? "bg-orange-100 text-orange-600"
                                        : "bg-red-100 text-red-600"
                                    }`}>
                                    {availableStock} un.
                                  </span>
                                </div>

                                {/* Preço */}
                                <p className="text-lg font-bold text-orange-600 mb-3">
                                  R$ {product.price.toFixed(2)}
                                </p>

                                {/* Controles de quantidade ou botão adicionar */}
                                {cartItem ? (
                                  <div className="flex items-center justify-between bg-orange-50 rounded-lg p-2">
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                                        className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center hover:bg-orange-700 transition text-xs"
                                      >
                                        <Minus className="w-3 h-3" />
                                      </button>
                                      <span className="font-semibold text-gray-900 w-6 text-center text-sm">
                                        {cartItem.quantity}
                                      </span>
                                      <button
                                        onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                                        disabled={availableStock <= 0}
                                        className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center hover:bg-orange-700 transition text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                                      >
                                        <Plus className="w-3 h-3" />
                                      </button>
                                    </div>
                                    <button
                                      onClick={() => removeFromCart(product.id)}
                                      className="p-1 text-red-500 hover:bg-red-100 rounded transition"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => addToCart(product)}
                                    disabled={product.stock <= 0}
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-1 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                  >
                                    <Plus className="w-4 h-4" />
                                    Adicionar
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {products.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-center text-gray-400">
                  <ShoppingCart className="w-14 h-14 mb-3 opacity-40" />
                  <h2 className="text-xl font-medium">Carregando produtos...</h2>
                  <p className="text-sm">
                    Aguarde enquanto carregamos o cardápio.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RESUMO DO PEDIDO */}
          <div className="bg-white border border-[#EAE7E2] rounded-xl p-6 shadow-sm h-fit sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Resumo do Pedido</h2>

            {/* Nome do cliente */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Cliente *
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Digite o nome do cliente"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Itens do pedido por categoria */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Itens do Pedido</h3>
              {cart.length === 0 ? (
                <p className="text-gray-400 text-sm">Nenhum item adicionado</p>
              ) : (
                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {Object.entries(cartByCategory).map(([category, items]) => (
                    <div key={category}>
                      <h4 className="font-medium text-gray-700 text-sm mb-2">{category}</h4>
                      <div className="space-y-2">
                        {items.map((item) => (
                          <div key={item.productId} className="flex justify-between items-center py-2 border-b border-gray-100">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                              <p className="text-xs text-gray-500">
                                {item.quantity} x R$ {item.price.toFixed(2)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900 text-sm">
                                R$ {item.subtotal.toFixed(2)}
                              </p>
                              <button
                                onClick={() => removeFromCart(item.productId)}
                                className="text-red-500 hover:text-red-700 text-xs transition"
                              >
                                Remover
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total */}
            {cart.length > 0 && (
              <div className="mb-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-orange-600">R$ {totalAmount.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Selecionar pagamento */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Forma de Pagamento
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="PIX">PIX</option>
                <option value="CREDIT_CARD">Cartão de Crédito</option>
                <option value="DEBIT_CARD">Cartão de Débito</option>
                <option value="CASH">Dinheiro</option>
              </select>
            </div>

            {/* Finalizar */}
            <button
              onClick={finalizeOrder}
              disabled={cart.length === 0 || !clientName.trim() || loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Processando...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Finalizar Pedido
                </>
              )}
            </button>
          </div>
        </div>

        {/* MODAL DE SUCESSO */}
        {showSuccessModal && orderSuccess && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  Pedido Concluído!
                </h2>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Informações do Pedido</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Nº do Pedido:</span> {orderSuccess.id}</p>
                      <p><span className="font-medium">Cliente:</span> {orderSuccess.clientName}</p>
                      <p><span className="font-medium">Data/Hora:</span> {formatDateTime(orderSuccess.dateTime)}</p>
                      <p><span className="font-medium">Pagamento:</span> {orderSuccess.paymentMethod}</p>
                      <p><span className="font-medium">Status:</span>
                        <span className={`ml-1 px-2 py-1 rounded-full text-xs ${orderSuccess.status === 'COMPLETED'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {orderSuccess.status}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Resumo</h3>
                    <div className="space-y-2 text-sm">
                      {orderSuccess.items.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span>{item.quantity}x {item.productName}</span>
                          <span>R$ {item.subtotal.toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="border-t border-gray-200 pt-2 font-bold">
                        <div className="flex justify-between">
                          <span>Total:</span>
                          <span className="text-orange-600">R$ {orderSuccess.totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pedidos;