export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  originalPrice?: number;
  currentPrice: number;
  currency: string;
  duration: string;
  rating: number;
  reviewCount: string | number;
  unitPriceLabel?: string;
  image?: string;
  colorTone?: string;
  badge?: {
    label: string;
    variant: "indigo" | "terracotta" | "kraft";
  };
  description: string;
  inclusions?: string[];
}

export interface CategoryOverview {
  category: ServiceCategory;
  count: number;
  fromPrice: number;
  currency: string;
}

export interface CatalogSummary {
  rating: number;
  bookingsLabel: string;
  cover: {
    label: string;
    text: string;
  };
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface RatingBreakdown {
  average: number;
  total: string;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

export interface ServiceDetail extends ServiceItem {
  longDescription: string;
  highlights: string[];
  reviews: Review[];
  ratingBreakdown: RatingBreakdown;
  relatedServiceIds: string[];
}

export type ServiceSort = "default" | "price-asc" | "price-desc" | "rating";

export const SORT_OPTIONS: ReadonlyArray<{ value: ServiceSort; label: string }> =
  [
    { value: "default", label: "Default" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating", label: "Rating" },
  ];
