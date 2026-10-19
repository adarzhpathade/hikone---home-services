import { cacheLife } from "next/cache";
import { serviceApi } from "@/features/services/api";
import { ServiceCatalogView } from "@/features/services/components/service-catalog-view";

export const metadata = {
  title: "Fridge Services — Hikone Editorial",
  description:
    "Precision refrigerator diagnostics, deep coil sanitization, and certified cooling repairs presented in Japanese-Scandinavian minimalism.",
};

// Cached so returning from a detail page shows the catalog immediately.
async function getFridgeCatalogData() {
  "use cache";
  cacheLife("hours");

  const [categories, services, summary] = await Promise.all([
    serviceApi.getFridgeCategories(),
    serviceApi.getFridgeServices(),
    serviceApi.getFridgeCatalogSummary(),
  ]);
  return { categories, services, summary };
}

async function FridgeCatalogData() {
  const { categories, services, summary } = await getFridgeCatalogData();

  return (
    <ServiceCatalogView
      title="Fridge Services"
      initialCategories={categories}
      initialServices={services}
      summary={summary}
    />
  );
}

export default function FridgeServicesPage() {
  return <FridgeCatalogData />;
}
