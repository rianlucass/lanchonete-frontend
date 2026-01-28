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

export interface ProductStock {
  productId: string;
  productName: string;
  currentStock: number;
  totalEntries: number;
  totalExits: number;
  totalAdjustments: number;
  totalLosses: number;
}

export interface StockEntryRequest {
  productId: string;
  quantity: number;
  reason: string;
}

export interface StockExitRequest {
  productId: string;
  quantity: number;
  reason: string;
}

export interface StockAdjustmentRequest {
  productId: string;
  targetQuantity: number;
  reason: string;
}

export interface StockLossRequest {
  productId: string;
  quantity: number;
  reason: string;
}

export const stockService = {
  getProductStock: (productId: string) => {
    return api.get<ProductStock>(`/stock/product/${productId}`);
  },

  registerEntry: (data: StockEntryRequest) => {
    return api.post<StockMovement>("/stock/entry", data);
  },

  registerExit: (data: StockExitRequest) => {
    return api.post<StockMovement>("/stock/exit", data);
  },

  registerAdjustment: (data: StockAdjustmentRequest) => {
    return api.post<StockMovement>("/stock/adjustment", data);
  },

  registerLoss: (data: StockLossRequest) => {
    return api.post<StockMovement>("/stock/loss", data);
  },

  getProductMovements: (productId: string) => {
    return api.get<StockMovement[]>(`/stock/movements/product/${productId}`);
  },

  getAllMovements: () => {
    return api.get<StockMovement[]>("/stock/movements");
  },

  getMovementsByType: (type: "ENTRY" | "EXIT" | "ADJUSTMENT" | "LOSS") => {
    return api.get<StockMovement[]>(`/stock/movements/type/${type}`);
  },
};