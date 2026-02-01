import { Product, Category } from "@/types/store";
import { sampleProducts, categories as defaultCategories } from "@/data/products";

const PRODUCTS_KEY = "alqotari_products";
const CATEGORIES_KEY = "alqotari_categories";

export const getProducts = (): Product[] => {
  const stored = localStorage.getItem(PRODUCTS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with sample products
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(sampleProducts));
  return sampleProducts;
};

export const saveProducts = (products: Product[]): void => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const addProduct = (product: Omit<Product, "id">): Product => {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
};

export const updateProduct = (id: string, updates: Partial<Product>): Product | null => {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  
  products[index] = { ...products[index], ...updates };
  saveProducts(products);
  return products[index];
};

export const deleteProduct = (id: string): boolean => {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  
  saveProducts(filtered);
  return true;
};

export const getCategories = (): Category[] => {
  const stored = localStorage.getItem(CATEGORIES_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategories));
  return defaultCategories;
};

export const saveCategories = (categories: Category[]): void => {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};

export const addCategory = (category: Omit<Category, "id">): Category => {
  const categories = getCategories();
  const newCategory: Category = {
    ...category,
    id: Date.now().toString(),
  };
  categories.push(newCategory);
  saveCategories(categories);
  return newCategory;
};

export const updateCategory = (id: string, updates: Partial<Category>): Category | null => {
  const categories = getCategories();
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) return null;
  
  categories[index] = { ...categories[index], ...updates };
  saveCategories(categories);
  return categories[index];
};

export const deleteCategory = (id: string): boolean => {
  const categories = getCategories();
  const filtered = categories.filter((c) => c.id !== id);
  if (filtered.length === categories.length) return false;
  
  saveCategories(filtered);
  return true;
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  const products = getProducts();
  return products.filter((p) => p.category === categorySlug);
};

export const getFeaturedProducts = (): Product[] => {
  const products = getProducts();
  return products.filter((p) => p.featured);
};

export const getProductById = (id: string): Product | null => {
  const products = getProducts();
  return products.find((p) => p.id === id) || null;
};

export const searchProducts = (query: string): Product[] => {
  const products = getProducts();
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
  );
};
