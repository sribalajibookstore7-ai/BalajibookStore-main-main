// types.ts (novo arquivo de tipagem)

// Tipos de dados para o sistema de e-commerce

// interface Product 
// Define a estrutura de um produto no e-commerce -> Dados retornados da API.
export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  tags: string[];
  reviews: Review[];
  weight: number;
  dimensions: Dimensions;
  images: string[];
  thumbnail: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
}

// interface Cart
// Define a estrutura de um carrinho de compras no e-commerce.

export type CartItem ={
  product: Product;
  quantity: number;
}

export type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getProductQuantity: (productId: number) => number;
  clearCart: () => void;
}