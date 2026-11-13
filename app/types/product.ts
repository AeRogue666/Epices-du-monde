type ProductOrigin = "Chine" | "Corée du Sud" | "Japon" | "Vietnam" | "Thaïlande" | "Taïwan"
type ProductCtg = "epices" | "nouilles" | "snacks" | "boissons" | "sauces"

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand?: string;
  weight?: string;
  price: number;
  oldPrice?: number;
  category: ProductCtg;
  origin: ProductOrigin;
  image: string;
  isNew?: boolean;
  isPromo?: boolean;
  inStock: boolean;
  description: string;
  ingredients?: string;
}