import Image from 'next/image';

import Link from '@/components/link';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  ScrollArea,
  ScrollBar,
} from '@/components/ui/scroll-area';

import ClearButton from './ClearButton';

interface Supplier {
  id: string;
  name: string;
  logo?: string | null;
  _count?: {
    products: number;
  };
}

interface ProductCategoryProps {
  suppliers: Supplier[];
}

const SupplierCard = ({ supplier }: { supplier: Supplier }) => (
  <div className="relative cursor-pointer rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 hover:shadow-lg flex-shrink-0 w-40 h-56 flex flex-col justify-between items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
    <div className="relative w-full h-28">
      <Image
        src={supplier.logo || "/placeholder.png"}
        alt={supplier.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
        style={{ objectFit: 'cover' }}
        className="rounded-t-lg"
        priority={true} // Ensures the image is loaded eagerly for better UX
      />
    </div>
    <div className="w-full px-2 text-sm font-medium text-gray-800 text-center truncate dark:text-gray-100 mt-2">
      {supplier.name}
    </div>
    {supplier._count?.products !== undefined && (
      <Badge
        variant={supplier._count.products === 0 ? "destructive" : "default"}
        className="absolute top-2 right-2 shadow-sm text-xs"
      >
        {supplier._count.products === 0
          ? "لا توجد منتجات"
          : `${supplier._count.products} منتجات`}
      </Badge>
    )}
  </div>
);

const CategoryList = ({ suppliers }: ProductCategoryProps) => (
  <Card className="w-full max-w-screen-lg mx-auto rtl text-right shadow-lg dark:bg-gray-500 dark:border-gray-800">
    <CardContent className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          قائمة الشركات
        </h2>
        <ClearButton />
      </div>
      <ScrollArea className="w-full rounded-lg shadow-sm">
        <div className="flex gap-4 p-4">
          {suppliers.map((supplier) => (
            <Link key={supplier.id} href={`?sid=${supplier.id}`}>
              <SupplierCard supplier={supplier} />
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="dark:bg-gray-700" />
      </ScrollArea>
    </CardContent>
  </Card>
);

export default CategoryList;
