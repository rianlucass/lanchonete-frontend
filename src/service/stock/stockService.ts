import { api } from "../api";

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  movementType: "ENTRY" | "EXIT" | "ADJUSTMENT" | "LOSS";
  quantity: number;
  dateTime: string;
  responsibleUser: string;
  reason: string;
  originType: string;
  originId: string | null;
}

export interface StockSummary {
  productId: string;
  productName: string;
  currentStock: number;
  totalEntries: number;
  totalExits: number;
  totalAdjustments: number;
  totalLosses: number;
}

export interface EntryRequest {
  productId: string;
  quantity: number;
  reason: string;
}

export interface ExitRequest {
  productId: string;
  quantity: number;
  reason: string;
}

export interface AdjustmentRequest {
  productId: string;
  targetQuantity: number;
  reason: string;
}

export interface LossRequest {
  productId: string;
  quantity: number;
  reason: string;
}

export interface MovementRequest {
  productId: string;
  movementType: "ENTRY" | "EXIT" | "ADJUSTMENT" | "LOSS";
  quantity: number;
  reason: string;
  originType?: string;
  originId?: string;
}

export const stockService = {
  // Registrar entrada de estoque
  registerEntry: async (data: EntryRequest) => {
    return await api.post<StockMovement>("/api/stock/entry", data);
  },

  // Registrar saída de estoque
  registerExit: async (data: ExitRequest) => {
    return await api.post<StockMovement>("/api/stock/exit", data);
  },

  // Registrar ajuste de estoque
  registerAdjustment: async (data: AdjustmentRequest) => {
    return await api.post<StockMovement>("/api/stock/adjustment", data);
  },

  // Registrar perda de estoque
  registerLoss: async (data: LossRequest) => {
    return await api.post<StockMovement>("/api/stock/loss", data);
  },

  // Registrar movimentação genérica
  registerMovement: async (data: MovementRequest) => {
    return await api.post<StockMovement>("/api/stock/movement", data);
  },

  // Consultar estoque atual de um produto
  getProductStock: async (productId: string) => {
    return await api.get<StockSummary>(`/api/stock/product/${productId}`);
  },

  // Listar movimentações de um produto
  getProductMovements: async (productId: string) => {
    return await api.get<StockMovement[]>(`/api/stock/movements/product/${productId}`);
  },

  // Listar todas as movimentações
  getAllMovements: async () => {
    return await api.get<StockMovement[]>("/api/stock/movements");
  },

  // Listar movimentações por tipo
  getMovementsByType: async (type: "ENTRY" | "EXIT" | "ADJUSTMENT" | "LOSS") => {
    return await api.get<StockMovement[]>(`/api/stock/movements/type/${type}`);
  },
};
