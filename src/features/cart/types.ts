import type { ServiceItem } from "@/features/services/types";

export interface CartLine {
  serviceId: string;
  title: string;
  unitPrice: number;
  originalPrice?: number;
  currency: string;
  duration: string;
  colorTone?: string;
  quantity: number;
}

export type CartService = Pick<
  ServiceItem,
  | "id"
  | "title"
  | "currentPrice"
  | "originalPrice"
  | "currency"
  | "duration"
  | "colorTone"
>;
