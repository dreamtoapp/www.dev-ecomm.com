export interface Product {
  id: string;
  name: string;
  price: number;
  details: string | null;
  size: string | null;
  published: boolean;
  outOfStock: boolean;
  imageUrl: string; // We'll ensure this is always a string in our data processing
  type: string;

  // Additional properties that might be included from the database
  supplier?: any;
  supplierId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
