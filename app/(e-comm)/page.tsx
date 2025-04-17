import {
  AlertCircle,
  KeyRound,
  MapPin,
  MapPinOff,
  ShieldX,
} from 'lucide-react';
import dynamic from 'next/dynamic';

import {
  fetchProducts,
  getPromotions,
  getSuppliersWithProducts,
} from '@/app/(e-comm)/homepage/actions/fetchProducts';
import { auth } from '@/auth';
import Link from '@/components/link';
import { cn } from '@/lib/utils';

import { generatePageMetadata } from '../../lib/seo-utils';

interface UserProps {

  name?: string | null
  email?: string | null
  image?: string | null
  id?: string
  role?: string
  phone?: string
  latitude?: string
  longitude?: string
  address?: string
  isOtp?: boolean
  isOauth?: boolean

}

// Lazy load components
const ProductList = dynamic(() => import("./homepage/component/ProductList"));
const OfferSection = dynamic(() => import("./homepage/component/Offer"));
const ProducCategory = dynamic(
  () => import("./homepage/component/ProducCategory")
);
const WhatsAppButton = dynamic(
  () => import("./homepage/component/WhatsAppButton")
);

// Define types for params and searchParams
type SearchParams = { [key: string]: string | string[] | undefined };

// Generate metadata dynamically
export async function generateMetadata() {
  return generatePageMetadata("ecomm");
}

// Main page component
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const { sid } = resolvedSearchParams;
  const session = await auth();


  // Fetch data in parallel
  const [products, supplierWithItems, promotions] = await Promise.all([
    fetchProducts(sid?.toString()),
    getSuppliersWithProducts(),
    getPromotions(),
  ]);

  return (
    <div className="container mx-auto bg-background text-foreground flex flex-col gap-4">
      {session && <UserActivation user={{ ...session.user }} />}
      {session && <UserLocation user={{ ...session.user }} />}


      <OfferSection offers={promotions} />
      <ProducCategory suppliers={supplierWithItems} />
      <ProductList products={products} />
      {/* <WhatsAppButton />   */}
    </div >
  );
}

const UserActivation = ({ user }: { user?: UserProps }) => {
  const isOtp = user?.isOtp;
  if (!user || isOtp) return null;

  return (
    <div className="mb-4">
      <div
        className={cn(
          "flex flex-col sm:flex-row items-center justify-between w-full p-4 rounded-lg border",
          "bg-destructive/10 border-destructive/30 text-destructive",
          "hover:bg-destructive/20 transition-colors duration-200"
        )}
      >
        <div className="flex items-center gap-3 mb-3 sm:mb-0">
          <div className="relative">
            <ShieldX className="h-6 w-6" />
            <AlertCircle
              className="absolute -right-1 -top-1 h-3 w-3 animate-pulse"
              fill="currentColor"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm sm:text-base">حساب غير مفعل</span>
            <span className="text-xs opacity-80">التفعيل مطلوب للوصول الكامل</span>
          </div>
        </div>

        <Link
          href={`/auth/verify?id=${user.id}`}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "transition-colors duration-150 w-full sm:w-auto"
          )}
          aria-label="تفعيل الحساب"
        >
          <KeyRound className="h-4 w-4" />
          <span className="font-medium">اكمال التفعيل</span>
        </Link>
      </div>
    </div>
  );
};

const UserLocation = ({ user }: { user?: UserProps }) => {
  if (!user?.id || (user.latitude && user.longitude)) return null;

  return (
    <div className="mb-4">
      <div
        className={cn(
          "flex flex-col sm:flex-row items-center justify-between w-full p-4 rounded-lg border",
          "bg-warning/10 border-warning/30 text-warning-foreground",
          "hover:bg-warning/20 transition-colors duration-200"
        )}
      >
        <div className="flex items-center gap-3 mb-3 sm:mb-0">
          <div className="relative">
            <MapPinOff className="h-6 w-6" />
            <AlertCircle
              className="absolute -right-1 -top-1 h-3 w-3 animate-pulse"
              fill="currentColor"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm sm:text-base">الموقع الجغرافي مطلوب</span>
            <span className="text-xs opacity-80">
              يرجى تحديث موقعك لإكمال الطلبات
            </span>
          </div>
        </div>

        <Link
          href={`/user/profile?id=${user.id}`
          }
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "transition-colors duration-150 w-full sm:w-auto"
          )}
          aria-label="تحديث الموقع"
        >
          <MapPin className="h-4 w-4" />
          <span className="font-medium">تحديث الموقع</span>
        </Link>
      </div>
    </div>
  );
};


