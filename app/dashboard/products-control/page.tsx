import { fetchProducts } from './actions/fetchProducts';
import ProductsControlClient from './components/ProductsControlClient';

export default async function ProductsControlPage(props: { searchParams: Promise<{ page?: string }> }) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page ?? '1') || 1;
  const pageSize = 10;
  const filters = {};
  const { products, total } = await fetchProducts({ page, pageSize, filters });

  return (
    <ProductsControlClient
      products={products}
      total={total}
      page={page}
      pageSize={pageSize}
    />
  );
}