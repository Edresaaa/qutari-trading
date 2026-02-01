export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  featured?: boolean;
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
