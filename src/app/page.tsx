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
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 sm:px-10 lg:px-12 pt-6 sm:pt-8">
        <div className="h-6 w-52 bg-canvas-surface rounded mb-8 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:gap-x-10 lg:gap-y-14">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="flex flex-col animate-pulse">
              <div className="aspect-square w-full bg-canvas-surface rounded-sm" />
              <div className="mt-4 h-3.5 w-3/5 bg-canvas-surface rounded" />
              <div className="mt-2 h-3.5 w-2/5 bg-canvas-surface rounded" />
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
