import { useEffect, useState } from "react";
import { Package, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { stockService } from "../service/stock/stockService";
import type { ProductStock } from "../service/stock/stockService";

const Estoque = () => {
  const [stocks, setStocks] = useState<ProductStock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadStocks();
  }, []);

  const loadStocks = async () => {
    try {
      setLoading(true);
      
      const allMovements = await stockService.getAllMovements();
      
      const productIds = [...new Set(allMovements.data.map(m => m.productId))];
      
      const stockPromises = productIds.map(id => 
        stockService.getProductStock(id)
      );
      
      const stocksData = await Promise.all(stockPromises);
      
      setStocks(stocksData.map(response => response.data));
      
    } catch (err) {
      console.error("Erro ao carregar estoque:", err);
      setError("Erro ao carregar dados do estoque");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Carregando estoque...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="w-8 h-8 text-orange-600" />
            Controle de Estoque
          </h1>
          <p className="text-gray-600 mt-2">
            Visualize e gerencie o estoque de todos os produtos
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-orange-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Produto</th>
                <th className="px-6 py-3 text-center">Estoque Atual</th>
                <th className="px-6 py-3 text-center">Total Entradas</th>
                <th className="px-6 py-3 text-center">Total Saídas</th>
                <th className="px-6 py-3 text-center">Ajustes</th>
                <th className="px-6 py-3 text-center">Perdas</th>
                <th className="px-6 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {stocks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    Nenhum produto cadastrado
                  </td>
                </tr>
              ) : (
                stocks.map((stock) => (
                  <tr key={stock.productId} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {stock.productName}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-lg font-bold text-gray-900">
                        {stock.currentStock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="flex items-center justify-center gap-1 text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        {stock.totalEntries}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="flex items-center justify-center gap-1 text-blue-600">
                        <TrendingDown className="w-4 h-4" />
                        {stock.totalExits}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      {stock.totalAdjustments}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="flex items-center justify-center gap-1 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        {stock.totalLosses}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {stock.currentStock <= 10 ? (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                          Baixo
                        </span>
                      ) : stock.currentStock <= 30 ? (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                          Médio
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          OK
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Estoque;