export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string; // Optional if you have images
}
