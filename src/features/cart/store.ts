import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine, CartService } from "./types";

interface CartState {
  lines: Record<string, CartLine>;
  add: (service: CartService) => void;
  remove: (serviceId: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: {},
      add: (service) =>
        set((state) => {
          const existing = state.lines[service.id];
          return {
            lines: {
              ...state.lines,
              [service.id]: {
                serviceId: service.id,
                title: service.title,
                unitPrice: service.currentPrice,
                originalPrice: service.originalPrice,
                currency: service.currency,
                duration: service.duration,
                colorTone: service.colorTone,
                quantity: (existing?.quantity ?? 0) + 1,
              },
            },
          };
        }),
      remove: (serviceId) =>
        set((state) => {
          const existing = state.lines[serviceId];
          if (!existing) return state;
          if (existing.quantity <= 1) {
            const rest = { ...state.lines };
            delete rest[serviceId];
            return { lines: rest };
          }
          return {
            lines: {
              ...state.lines,
              [serviceId]: { ...existing, quantity: existing.quantity - 1 },
            },
          };
        }),
    }),
    {
      name: "urban-cart",
      // Rehydrated on mount so server and first client render match.
      skipHydration: true,
    },
  ),
);

export const selectQuantity = (serviceId: string) => (state: CartState) =>
  state.lines[serviceId]?.quantity ?? 0;

export const selectCount = (state: CartState) =>
  Object.values(state.lines).reduce((sum, line) => sum + line.quantity, 0);

export const selectTotal = (state: CartState) =>
  Object.values(state.lines).reduce(
    (sum, line) => sum + line.unitPrice * line.quantity,
    0,
  );

export const selectSavings = (state: CartState) =>
  Object.values(state.lines).reduce(
    (sum, line) =>
      sum +
      Math.max(0, (line.originalPrice ?? line.unitPrice) - line.unitPrice) *
        line.quantity,
    0,
  );
