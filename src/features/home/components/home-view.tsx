"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/navigation/site-footer";
import { SearchDialog } from "@/components/navigation/search-dialog";
import { useCartStore } from "@/features/cart/store";
import { HomeHero } from "./home-hero";
import { CategoryGateway } from "./category-gateway";
import { PromotionalBanners } from "./promotional-banners";
import { QualityStandards } from "./quality-standards";

const CartBar = dynamic(() =>
  import("@/features/cart/components/cart-bar").then((mod) => mod.CartBar),
);
const CartDrawer = dynamic(() =>
  import("@/features/cart/components/cart-drawer").then(
    (mod) => mod.CartDrawer,
  ),
);

export function HomeView() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartRequested, setCartRequested] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const openCart = () => {
    setCartRequested(true);
    setCartOpen(true);
  };

  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      {/* Main Navigation Header */}
      <SiteHeader onCartClick={openCart} />

      {/* One gap separates the hero and every section */}
      <main className="vt-page flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-12 flex flex-col gap-14 sm:gap-20">
        {/* Hero */}
        <HomeHero onSearchClick={() => setSearchOpen(true)} />

        {/* Available Appliance Portals (AC & Fridge only) */}
        <CategoryGateway />

        {/* Current offers */}
        <PromotionalBanners />

        {/* Quality Standards & Guarantees */}
        <QualityStandards />
      </main>

      <CartBar currency="₹" onViewCart={openCart} />
      {cartRequested && (
        <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      )}

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      <SiteFooter />
    </div>
  );
}
