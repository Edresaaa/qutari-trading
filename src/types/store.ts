import { ProductSizeType } from "./sizes";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  inStock: boolean;
  featured?: boolean;
  quantity?: number;
  isVisible?: boolean;
  sizeType?: ProductSizeType;
  availableSizes?: string[];
  availableLengths?: string[];
  availableWidths?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
}

export interface StoreConfig {
  name: string;
  whatsappNumber: string;
  logo?: string;
  description?: string;
  address?: string;
  phones?: string[];
}

export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  link: string;
  isActive: boolean;
}
