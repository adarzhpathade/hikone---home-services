"use client";

import { useEffect, useState, useTransition } from "react";
import type { ServiceCategory, ServiceItem } from "../types";
import { serviceApi } from "../api";
import { SiteHeader } from "@/components/navigation/site-header";
import { CategoryBar } from "./category-bar";
import { ServiceGrid } from "./service-grid";
import { ServiceDetailSheet } from "./service-detail-sheet";
import { SiteFooter } from "@/components/navigation/site-footer";

interface ServiceCatalogViewProps {
  initialCategories: ServiceCategory[];
  initialServices: ServiceItem[];
}

export function ServiceCatalogView({
  initialCategories,
  initialServices,
}: ServiceCatalogViewProps) {
  const [categories] = useState<ServiceCategory[]>(initialCategories);
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSort, setActiveSort] = useState<
    "default" | "price-asc" | "price-desc" | "rating"
  >("default");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const fetched = await serviceApi.getServices({
        categorySlug: activeCategory,
        sortBy: activeSort,
      });
      setServices(fetched);
    });
  }, [activeCategory, activeSort]);

  const handleAddToCart = (_service: ServiceItem) => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      {/* Editorial Header */}
      <SiteHeader cartCount={cartCount} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 sm:px-10 lg:px-12 pt-6 sm:pt-8">
        {/* Category & Sorting Subheader */}
        <CategoryBar
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          activeSort={activeSort}
          onSelectSort={setActiveSort}
        />

        {/* 3-Column Service Grid */}
        <ServiceGrid
          services={services}
          isLoading={isPending}
          onSelectService={(service) => setSelectedService(service)}
        />
      </main>

      {/* Service Detail Drawer */}
      <ServiceDetailSheet
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Hikone Editorial Footer */}
      <SiteFooter />
    </div>
  );
}
