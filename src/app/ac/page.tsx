import { cacheLife } from "next/cache";
import { serviceApi } from "@/features/services/api";
import { ServiceCatalogView } from "@/features/services/components/service-catalog-view";

export const metadata = {
  title: "AC Services — Hikone Editorial",
  description:
    "Precision cooling care, deep foam-jet sanitization, and guaranteed repairs delivered by verified specialists.",
};

// Cached so returning from a detail page shows the catalog immediately.
async function getACCatalogData() {
  "use cache";
  cacheLife("hours");

  const [categories, services, summary] = await Promise.all([
    serviceApi.getCategories(),
    serviceApi.getACServices(),
    serviceApi.getCatalogSummary(),
  ]);
  return { categories, services, summary };
}

async function ACCatalogData() {
  const { categories, services, summary } = await getACCatalogData();

  return (
    <ServiceCatalogView
      title="AC Services"
      initialCategories={categories}
      initialServices={services}
      summary={summary}
    />
  );
}

export default function ACServicesPage() {
  return <ACCatalogData />;
}
