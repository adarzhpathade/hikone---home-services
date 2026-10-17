import { Suspense } from "react";
import { serviceApi } from "@/features/services/api";
import { ServiceCatalogView } from "@/features/services/components/service-catalog-view";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/navigation/site-footer";

export const metadata = {
  title: "Services Catalog — Hikone Editorial",
  description:
    "Curated architectural and lifestyle services presented in Japanese-Scandinavian minimalism.",
};

async function CatalogData() {
  const [categories, services] = await Promise.all([
    serviceApi.getCategories(),
    serviceApi.getServices(),
  ]);

  return (
    <ServiceCatalogView
      initialCategories={categories}
      initialServices={services}
    />
  );
}

function CatalogSkeleton() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <SiteHeader cartCount={0} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8">
        <div className="h-8 w-60 bg-canvas-surface rounded mb-4 animate-pulse" />
        <div className="h-10 w-full border-y border-hairline mb-6 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-hairline">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border-r border-b border-hairline p-5 flex flex-col animate-pulse">
              <div className="aspect-square w-full bg-canvas-surface rounded-sm mb-4" />
              <div className="h-3.5 w-1/3 bg-canvas-surface rounded mb-1" />
              <div className="h-3 w-2/3 bg-canvas-surface rounded mb-3" />
              <div className="h-3 w-1/4 bg-canvas-surface rounded-full" />
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<CatalogSkeleton />}>
      <CatalogData />
    </Suspense>
  );
}
