import { fetchProducts } from './actions/fetchProducts';
import ProductsControlClient from './components/ProductsControlClient';

export default async function ProductsControlPage(props: { searchParams: Promise<{ page?: string }> }) {
  // Data fetching is now handled completely in ProductsControlClient
  return <ProductsControlClient />;
}