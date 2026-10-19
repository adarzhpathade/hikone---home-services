"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { ServiceDetail, ServiceItem } from "@/features/services/types";
import { ServiceDetailHero } from "@/features/services/components/service-detail-hero";
import { ServiceReviews } from "@/features/services/components/service-reviews";
import { ServiceRecommendations } from "@/features/services/components/service-recommendations";
import { useCartStore } from "@/features/cart/store";

const CartBar = dynamic(() =>
  import("@/features/cart/components/cart-bar").then((mod) => mod.CartBar),
);
const CartDrawer = dynamic(() =>
  import("@/features/cart/components/cart-drawer").then(
    (mod) => mod.CartDrawer,
  ),
);

interface ServiceDetailContentProps {
  service: ServiceDetail;
  relatedServices: ServiceItem[];
}

export function ServiceDetailContent({
  service,
  relatedServices,
}: ServiceDetailContentProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartRequested, setCartRequested] = useState(false);

  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);

  const openCart = () => {
    setCartRequested(true);
    setCartOpen(true);
  };

  return (
    <>
      <div className="space-y-12">
        <ServiceDetailHero service={service} />
        <ServiceReviews
          ratingBreakdown={service.ratingBreakdown}
          reviews={service.reviews}
        />
        <ServiceRecommendations services={relatedServices} />
      </div>

      <CartBar currency={service.currency} onViewCart={openCart} />
      {cartRequested && (
        <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      )}
    </>
  );
}
