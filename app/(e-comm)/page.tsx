import dynamic from 'next/dynamic';

import { auth } from '@/auth';

import { generatePageMetadata } from '../../lib/seo-utils';
import { fetchProducts } from './homepage/actions/fetchProducts';
import { getPromotions } from './homepage/actions/getPromotions';
import { fetchSuppliersWithProducts } from './homepage/actions/getSuppliersWithProducts';
import CategoryList from './homepage/component/category/CategoryList';
import CheckUserActivation from './homepage/component/CheckUserActivation';
import CheckUserLocation from './homepage/component/CheckUserLocation';

const SkeletonLoader = () => <div className="animate-pulse">Loading...</div>;

const ProductList = dynamic(() => import("./homepage/component/product/ProductList"), {
  ssr: true,
  loading: SkeletonLoader,
});
const SliderSection = dynamic(() => import("./homepage/component/slider/SliderSection"), {
  ssr: true,
  loading: SkeletonLoader,
});
const ProducCategory = dynamic(
  () => import("./homepage/component/product/ProducCategory"),
  {
    ssr: true,
    loading: SkeletonLoader,
  }
);
const ClearButton = dynamic(() => import("./homepage/component/category/ClearButton"), {
  ssr: true,
  loading: SkeletonLoader,
});

// Generate metadata dynamically
export async function generateMetadata() {
  return generatePageMetadata("ecomm");
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;
  const session = await auth();

  // Fetch data in parallel without artificial delays
  const [products, supplierWithItems, promotions] = await Promise.all([
    fetchProducts(slug || ""),
    fetchSuppliersWithProducts(),
    getPromotions(),
  ]);

  return (
    <div className="container mx-auto bg-background text-foreground flex flex-col gap-4">
      {session && <CheckUserActivation user={session.user} />}
      {session && <CheckUserLocation user={session.user} />}

      <SliderSection offers={promotions} />
      <ClearButton slugString={slug} />
      <CategoryList
        suppliers={supplierWithItems.companyData}
        cardDescription={
          supplierWithItems.companyData.length > 0
            ? "اكتشف المنتجات من الشركات الموثوقة وتمتع بأفضل الخيارات المتاحة"
            : "لا توجد شركات متاحة حالياً"
        }
        cardHeader={
          supplierWithItems.companyData.length > 0
            ? "قائمة الشركات المميزة"
            : "الشركات غير متوفرة"
        }
      />
      {supplierWithItems.offerData && supplierWithItems.offerData.length > 0 ? (
        <CategoryList
          suppliers={supplierWithItems.offerData}
          cardDescription="استمتع بأفضل العروض والخصومات على المنتجات المختارة"
          cardHeader="قائمة العروض الحصرية"
        />
      ) : (
        <CategoryList
          suppliers={[]}
          cardDescription="لا توجد عروض متاحة حالياً"
          cardHeader="العروض غير متوفرة"
        />
      )}
      <ProductList products={products} />
    </div>
  );
}





