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
  reviewCount: number;
  image: string;
  badge?: {
    label: string;
    variant: "indigo" | "terracotta" | "kraft";
  };
  description: string;
  inclusions?: string[];
}
