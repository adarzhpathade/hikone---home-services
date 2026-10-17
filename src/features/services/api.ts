import { MOCK_CATEGORIES, MOCK_SERVICES } from "@/mocks/services-data";
import type { ServiceCategory, ServiceItem } from "./types";

const SIMULATED_LATENCY_MS = 300;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface GetServicesParams {
  categorySlug?: string;
  sortBy?: "default" | "price-asc" | "price-desc" | "rating";
}

export const serviceApi = {
  async getCategories(): Promise<ServiceCategory[]> {
    await wait(SIMULATED_LATENCY_MS);
    return [...MOCK_CATEGORIES];
  },

  async getServices(params: GetServicesParams = {}): Promise<ServiceItem[]> {
    await wait(SIMULATED_LATENCY_MS);
    const { categorySlug = "all", sortBy = "default" } = params;

    let items = [...MOCK_SERVICES];

    if (categorySlug && categorySlug !== "all") {
      items = items.filter((item) => item.category === categorySlug);
    }

    if (sortBy === "price-asc") {
      items.sort((a, b) => a.currentPrice - b.currentPrice);
    } else if (sortBy === "price-desc") {
      items.sort((a, b) => b.currentPrice - a.currentPrice);
    } else if (sortBy === "rating") {
      items.sort((a, b) => b.rating - a.rating);
    }

    return items;
  },

  async getServiceById(id: string): Promise<ServiceItem | null> {
    await wait(SIMULATED_LATENCY_MS);
    const item = MOCK_SERVICES.find((s) => s.id === id);
    return item ? { ...item } : null;
  },
};
