import dynamic from 'next/dynamic';

import { auth } from '@/auth';

import { generatePageMetadata } from '../../lib/seo-utils';
import {
  CategoryListClient,
  CheckUserActivationClient,
  CheckUserLocationClient,
} from './components/EcommClientWrappers';
// Products are now fetched in PaginatedProductsWrapper
import { getPromotions } from './homepage/actions/getPromotions';
import { fetchSuppliersWithProducts } from './homepage/actions/getSuppliersWithProducts';
import ClearButton from './homepage/component/category/ClearButton';
import PreloadScript from './homepage/component/PreloadScript';
// Import critical components directly for better performance
import SliderSection from './homepage/component/slider/SliderSection';

// Use dynamic imports with optimized component
const ProductsSection = dynamic(
  () => import("./homepage/component/product/ProductsSection"),
  {
    ssr: true,
    loading: () => (
      <div className="container mx-auto p-4">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-2xl shadow-md overflow-hidden relative bg-card border-border animate-pulse h-80">
              <div className="h-40 bg-gray-300"></div>
              <div className="p-4 space-y-4">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-8 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  }
);

// We'll keep this import in case we need it later
// const ProducCategory = dynamic(
//   () => import("./homepage/component/product/ProducCategory"),
//   {
//     ssr: true,
//   }
// );

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

  // Fetch data in parallel
  const [supplierWithItems, promotions] = await Promise.all([
    fetchSuppliersWithProducts(),
    getPromotions(),
  ]);

  // Ensure we have at least one promotion for testing
  const testPromotions = promotions.length > 0 ? promotions : [
    {
      id: "test-1",
      title: "Special Summer Collection",
      imageUrl: "/fallback/fallback.avif" // Local image for reliable testing
    },
    {
      id: "test-2",
      title: "New Arrivals - Spring 2025",
      imageUrl: "/fallback/fallback.webp" // Local image for reliable testing
    },
    {
      id: "test-3",
      title: "Exclusive Deals - Limited Time",
      imageUrl: "https://source.unsplash.com/random/1200x600/?fashion,sale" // Keep one remote image for testing
    }
  ];

  console.log("Page - Test Promotions:", testPromotions);

  return (
    <div className="container mx-auto bg-background text-foreground flex flex-col gap-4">
      {/* Add performance optimization script */}
      <PreloadScript />

      {session && <CheckUserActivationClient user={session.user} />}
      {session && <CheckUserLocationClient user={session.user} />}

      <SliderSection offers={testPromotions} />
      <ClearButton slugString={slug} />
      <CategoryListClient
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
        <CategoryListClient
          suppliers={supplierWithItems.offerData}
          cardDescription="استمتع بأفضل العروض والخصومات على المنتجات المختارة"
          cardHeader="قائمة العروض الحصرية"
        />
      ) : (
        <CategoryListClient
          suppliers={[]}
          cardDescription="لا توجد عروض متاحة حالياً"
          cardHeader="العروض غير متوفرة"
        />
      )}
      <ProductsSection slug={slug || ""} />
    </div>
  );
}
