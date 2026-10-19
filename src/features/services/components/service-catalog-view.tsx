"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  CatalogSummary,
  ServiceCategory,
  ServiceItem,
} from "../types";
import dynamic from "next/dynamic";
import { SiteHeader } from "@/components/navigation/site-header";
import { CatalogHero } from "./catalog-overview";
import { ServiceGrid, type ServiceSection } from "./service-grid";
import { useCartStore } from "@/features/cart/store";
import { SiteFooter } from "@/components/navigation/site-footer";

const CartBar = dynamic(() =>
  import("@/features/cart/components/cart-bar").then((mod) => mod.CartBar),
);
const CartDrawer = dynamic(() =>
  import("@/features/cart/components/cart-drawer").then(
    (mod) => mod.CartDrawer,
  ),
);

interface ServiceCatalogViewProps {
  initialCategories: ServiceCategory[];
  initialServices: ServiceItem[];
  summary: CatalogSummary;
  title?: string;
}

export function ServiceCatalogView({
  initialCategories,
  initialServices,
  summary,
  title,
}: ServiceCatalogViewProps) {
  const [categories] = useState<ServiceCategory[]>(initialCategories);
  const [services] = useState<ServiceItem[]>(initialServices);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartRequested, setCartRequested] = useState(false);

  // One section per category, in category order, skipping the "all" entry.
  const sections = useMemo<ServiceSection[]>(
    () =>
      categories
        .filter((category) => category.slug !== "all")
        .map((category) => ({
          category,
          services: services.filter((s) => s.category === category.slug),
        }))
        .filter((section) => section.services.length > 0),
    [categories, services],
  );

  // The drawer chunk is only fetched once the cart is first opened.
  const openCart = () => {
    setCartRequested(true);
    setCartOpen(true);
  };

  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      {/* Editorial Header */}
      <SiteHeader onCartClick={openCart} />

      {/* Main Content Area */}
      <main className="vt-page flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-12 pt-4 sm:pt-6">
        <CatalogHero summary={summary} title={title} />

        {/* One hairline grid per category */}
        <div id="services-catalog-grid">
          <ServiceGrid sections={sections} />
        </div>
      </main>

      <CartBar
        currency={services[0]?.currency ?? ""}
        onViewCart={openCart}
      />
      {cartRequested && (
        <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      )}

      {/* Hikone Editorial Footer */}
      <SiteFooter />
    </div>
  );
}
