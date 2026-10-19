import {
  MOCK_CATALOG_SUMMARY,
  MOCK_CATEGORIES,
  MOCK_SERVICES,
  MOCK_AC_SERVICES,
  MOCK_FRIDGE_CATEGORIES,
  MOCK_FRIDGE_SERVICES,
  MOCK_FRIDGE_SUMMARY,
  getMockServiceDetail,
} from "@/mocks/services-data";
import type {
  CatalogSummary,
  CategoryOverview,
  ServiceCategory,
  ServiceItem,
  ServiceDetail,
} from "./types";

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

  async getACServices(): Promise<ServiceItem[]> {
    await wait(SIMULATED_LATENCY_MS);
    return [...MOCK_AC_SERVICES];
  },

  async getTrendingServices(): Promise<ServiceItem[]> {
    await wait(SIMULATED_LATENCY_MS);
    const trendingIds = ["srv-ac-1", "srv-fridge-1", "srv-ac-2", "srv-fridge-4"];
    return trendingIds
      .map((id) => MOCK_SERVICES.find((s) => s.id === id))
      .filter((s): s is ServiceItem => s !== undefined);
  },

  async getCatalogSummary(): Promise<CatalogSummary> {
    await wait(SIMULATED_LATENCY_MS);
    return { ...MOCK_CATALOG_SUMMARY, cover: { ...MOCK_CATALOG_SUMMARY.cover } };
  },

  async getFridgeCategories(): Promise<ServiceCategory[]> {
    await wait(SIMULATED_LATENCY_MS);
    return [...MOCK_FRIDGE_CATEGORIES];
  },

  async getFridgeCatalogSummary(): Promise<CatalogSummary> {
    await wait(SIMULATED_LATENCY_MS);
    return { ...MOCK_FRIDGE_SUMMARY, cover: { ...MOCK_FRIDGE_SUMMARY.cover } };
  },

  async getFridgeServices(): Promise<ServiceItem[]> {
    await wait(SIMULATED_LATENCY_MS);
    return [...MOCK_FRIDGE_SERVICES];
  },

  async getFridgeCategoryOverview(): Promise<CategoryOverview[]> {
    await wait(SIMULATED_LATENCY_MS);
    return MOCK_FRIDGE_CATEGORIES.filter((category) => category.slug !== "all")
      .map((category) => {
        const items = MOCK_FRIDGE_SERVICES.filter((s) => s.category === category.slug);
        return {
          category: { ...category },
          count: items.length,
          fromPrice: Math.min(...items.map((s) => s.currentPrice)),
          currency: items[0]?.currency ?? "",
        };
      })
      .filter((overview) => overview.count > 0);
  },

  async getAllCategoryOverviews(): Promise<CategoryOverview[]> {
    await wait(SIMULATED_LATENCY_MS);
    const allCategories = [
      ...MOCK_CATEGORIES.filter((c) => c.slug !== "all"),
      ...MOCK_FRIDGE_CATEGORIES.filter((c) => c.slug !== "all"),
    ];
    return allCategories
      .map((category) => {
        const items = MOCK_SERVICES.filter((s) => s.category === category.slug);
        return {
          category: { ...category },
          count: items.length,
          fromPrice: Math.min(...items.map((s) => s.currentPrice)),
          currency: items[0]?.currency ?? "₹",
        };
      })
      .filter((overview) => overview.count > 0);
  },

  async getCategoryOverview(): Promise<CategoryOverview[]> {
    await wait(SIMULATED_LATENCY_MS);
    return MOCK_CATEGORIES.filter((category) => category.slug !== "all")
      .map((category) => {
        const items = MOCK_SERVICES.filter((s) => s.category === category.slug);
        return {
          category: { ...category },
          count: items.length,
          fromPrice: Math.min(...items.map((s) => s.currentPrice)),
          currency: items[0]?.currency ?? "",
        };
      })
      .filter((overview) => overview.count > 0);
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

  async getServiceBySlug(slug: string): Promise<ServiceDetail | null> {
    await wait(SIMULATED_LATENCY_MS);
    const item = MOCK_SERVICES.find((s) => s.slug === slug);
    if (!item) return null;
    return getMockServiceDetail(item);
  },

  async getServiceSlugs(): Promise<string[]> {
    return MOCK_SERVICES.map((s) => s.slug);
  },

  async getRelatedServices(serviceIds: string[]): Promise<ServiceItem[]> {
    await wait(SIMULATED_LATENCY_MS);
    return serviceIds
      .map((id) => MOCK_SERVICES.find((s) => s.id === id))
      .filter((s): s is ServiceItem => s !== undefined);
  },

  async searchServices(query: string): Promise<ServiceItem[]> {
    await wait(100);
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return MOCK_SERVICES.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.inclusions?.some((inc) => inc.toLowerCase().includes(q)),
    );
  },
};
