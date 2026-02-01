import { Product, Category } from "@/types/store";
import { sampleProducts, categories as defaultCategories } from "@/data/products";

const PRODUCTS_KEY = "alqotari_products";
const CATEGORIES_KEY = "alqotari_categories";
const BANNERS_KEY = "alqotari_banners";
const STORE_SETTINGS_KEY = "alqotari_store_settings";
const OFFER_SETTINGS_KEY = "alqotari_offer_settings";
const DATA_VERSION_KEY = "alqotari_data_version";
const CURRENT_VERSION = "2.3"; // Increment this to force data refresh

export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  link: string;
  isActive: boolean;
}

export interface StoreSettings {
  storeName: string;
  whatsappNumber: string;
  address: string;
  phones: string[];
  description: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface OfferSettings {
  title: string;
  subtitle: string;
  discountPercentage: number;
  endDate: string; // ISO date string
  isActive: boolean;
}

const defaultBanners: Banner[] = [
  {
    id: "1",
    image: "https://cdn.salla.sa/vygWG/fc857e5a-15b1-4f48-a8a0-eef08200f007-500x500-wKiTygOIxKOUotrIB2usaw4SCg0fqXsv3FHojQ3F.jpg",
    title: "غتر كشميري VIP",
    subtitle: "أجود أنواع الغتر الكشميرية الشتوية",
    link: "/products?category=kashmiri-vip",
    isActive: true,
  },
  {
    id: "2",
    image: "https://cdn.salla.sa/vygWG/dd6c4672-2221-4d1f-81df-2905eb278dc4-500x500-NvuOunZPRjErJDSCu7Kn0tGmt4Rz5FdpkGaHkBjf.jpg",
    title: "شيلان باشمينا ملكي",
    subtitle: "صوف كشميري 100% بجودة استثنائية",
    link: "/products?category=pashmina-royal",
    isActive: true,
  },
  {
    id: "3",
    image: "https://cdn.salla.sa/vygWG/fcb6c396-c90b-4466-86d6-355e5baad27f-500x500-jIccBxG0LWqHG5iE6qnTglkEyy9P3QyeKR2VPPDz.jpg",
    title: "أشمغة شتوية دافئة",
    subtitle: "تشكيلة متنوعة من الأشمغة الشتوية",
    link: "/products?category=winter-shemagh",
    isActive: true,
  },
];

const defaultStoreSettings: StoreSettings = {
  storeName: "القوطاري للتجارة",
  whatsappNumber: "+967736700034",
  address: "صنعاء - باب اليمن - سوق النظارة",
  phones: ["+967736700034", "+967770475574"],
  description: "متجر متخصص في الشيلان والأزياء التقليدية الفاخرة",
  socialLinks: {
    facebook: "",
    instagram: "",
    twitter: "",
  },
};

const getDefaultOfferEndDate = (): string => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toISOString();
};

const defaultOfferSettings: OfferSettings = {
  title: "خصم يصل إلى 50%",
  subtitle: "على جميع الغتر الكشميرية والشيلان الباشمينا الملكي",
  discountPercentage: 50,
  endDate: getDefaultOfferEndDate(),
  isActive: true,
};

// Products functions
export const getProducts = (): Product[] => {
  const storedVersion = localStorage.getItem(DATA_VERSION_KEY);
  
  if (storedVersion !== CURRENT_VERSION) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(sampleProducts));
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategories));
    localStorage.setItem(BANNERS_KEY, JSON.stringify(defaultBanners));
    localStorage.setItem(STORE_SETTINGS_KEY, JSON.stringify(defaultStoreSettings));
    localStorage.setItem(DATA_VERSION_KEY, CURRENT_VERSION);
    return sampleProducts;
  }
  
  const stored = localStorage.getItem(PRODUCTS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(sampleProducts));
  return sampleProducts;
};

export const saveProducts = (products: Product[]): void => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  window.dispatchEvent(new Event('productsUpdated'));
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

// Categories functions
export const getCategories = (): Category[] => {
  const storedVersion = localStorage.getItem(DATA_VERSION_KEY);
  
  if (storedVersion !== CURRENT_VERSION) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategories));
    localStorage.setItem(DATA_VERSION_KEY, CURRENT_VERSION);
    return defaultCategories;
  }
  
  const stored = localStorage.getItem(CATEGORIES_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategories));
  return defaultCategories;
};

export const saveCategories = (categories: Category[]): void => {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  window.dispatchEvent(new Event('productsUpdated'));
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

// Banners functions
export const getBanners = (): Banner[] => {
  const stored = localStorage.getItem(BANNERS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(BANNERS_KEY, JSON.stringify(defaultBanners));
  return defaultBanners;
};

export const saveBanners = (banners: Banner[]): void => {
  localStorage.setItem(BANNERS_KEY, JSON.stringify(banners));
  window.dispatchEvent(new Event('productsUpdated'));
};

export const addBanner = (banner: Omit<Banner, "id">): Banner => {
  const banners = getBanners();
  const newBanner: Banner = {
    ...banner,
    id: Date.now().toString(),
  };
  banners.push(newBanner);
  saveBanners(banners);
  return newBanner;
};

export const updateBanner = (id: string, updates: Partial<Banner>): Banner | null => {
  const banners = getBanners();
  const index = banners.findIndex((b) => b.id === id);
  if (index === -1) return null;
  
  banners[index] = { ...banners[index], ...updates };
  saveBanners(banners);
  return banners[index];
};

export const deleteBanner = (id: string): boolean => {
  const banners = getBanners();
  const filtered = banners.filter((b) => b.id !== id);
  if (filtered.length === banners.length) return false;
  
  saveBanners(filtered);
  return true;
};

export const getActiveBanners = (): Banner[] => {
  return getBanners().filter((b) => b.isActive);
};

// Store Settings functions
export const getStoreSettings = (): StoreSettings => {
  const stored = localStorage.getItem(STORE_SETTINGS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORE_SETTINGS_KEY, JSON.stringify(defaultStoreSettings));
  return defaultStoreSettings;
};

export const saveStoreSettings = (settings: StoreSettings): void => {
  localStorage.setItem(STORE_SETTINGS_KEY, JSON.stringify(settings));
  window.dispatchEvent(new Event('productsUpdated'));
};

// Offer Settings functions
export const getOfferSettings = (): OfferSettings => {
  const stored = localStorage.getItem(OFFER_SETTINGS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(OFFER_SETTINGS_KEY, JSON.stringify(defaultOfferSettings));
  return defaultOfferSettings;
};

export const saveOfferSettings = (settings: OfferSettings): void => {
  localStorage.setItem(OFFER_SETTINGS_KEY, JSON.stringify(settings));
  window.dispatchEvent(new Event('productsUpdated'));
};

// Helper functions
export const getProductsByCategory = (categorySlug: string): Product[] => {
  const products = getProducts();
  return products.filter((p) => p.category === categorySlug && p.isVisible !== false);
};

export const getFeaturedProducts = (): Product[] => {
  const products = getProducts();
  return products.filter((p) => p.featured && p.isVisible !== false);
};

export const getVisibleProducts = (): Product[] => {
  const products = getProducts();
  return products.filter((p) => p.isVisible !== false);
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
      p.isVisible !== false &&
      (p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery))
  );
};
