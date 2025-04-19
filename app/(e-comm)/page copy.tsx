import dynamic from 'next/dynamic';

import { auth } from '@/auth';

import { generatePageMetadata } from '../../lib/seo-utils';
import { fetchProducts } from './homepage/actions/fetchProducts';
import { getPromotions } from './homepage/actions/getPromotions';
import { fetchSuppliersWithProducts } from './homepage/actions/getSuppliersWithProducts';
import CategoryList from './homepage/component/category/CategoryList';
import CheckUserActivation from './homepage/component/CheckUserActivation';
import CheckUserLocation from './homepage/component/CheckUserLocation';

// Dynamically import components with proper configuration
const ProductList = dynamic(() => import("./homepage/component/ProductList"), {
  ssr: true, // Enable server-side rendering for better SEO
});
const OfferSection = dynamic(() => import("./homepage/component/Offer"), {
  ssr: true,
});
const ProducCategory = dynamic(
  () => import("./homepage/component/ProducCategory"),
  {
    ssr: true,
  }
);

export async function generateStaticParams() {
  const suppliers = await fetchSuppliersWithProducts();

  return suppliers.map((supplier) => ({
    sid: supplier.id.toString(),
  }));
}


// Generate metadata dynamically
export async function generateMetadata() {
  return generatePageMetadata("ecomm");
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ sid?: string }>;
}) {
  const { sid } = await searchParams;
  const session = await auth();

  // Fetch data in parallel without artificial delays
  const [products, supplierWithItems, promotions] = await Promise.all([
    fetchProducts(sid?.toString() || ""), // Ensure sid is a string
    fetchSuppliersWithProducts(),
    getPromotions(),
  ]);
  // getServerSideProps
  return (
    <div className="container mx-auto bg-background text-foreground flex flex-col gap-4">
      {session && <CheckUserActivation user={session.user} />}
      {session && <CheckUserLocation user={session.user} />}

      {/* Render components directly; loading.tsx will handle loading states */}
      {/* <OfferSection offers={promotions} /> */}
      {/* <ProducCategory suppliers={supplierWithItems} /> */}
      <CategoryList suppliers={supplierWithItems} />

      <ProductList products={products} />
    </div>
  );
}





