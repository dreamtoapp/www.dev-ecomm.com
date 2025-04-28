export interface ProductType {
  id: string;
  name: string;
  price: number;
  details: string | null;
  size: string | null;
  published: boolean;
  outOfStock: boolean;
  imageUrl: string;
  type: string;
}
