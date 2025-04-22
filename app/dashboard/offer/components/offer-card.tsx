import React from 'react';

import {
  Package,
  TriangleAlert,
} from 'lucide-react';

import CardImage from '@/components/CardImage';
import Link from '@/components/link';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import {
  DeleteSupplierAlert,
  EditSupplierDialog,
} from './dynmic-edit-delete';

interface SupplierCardProps {
  supplier: {
    id: string
    name: string
    logo: string | null
    productCount: number
  }
}

const ProductCountBadge = ({ hasProducts, productCount }: {
  hasProducts: boolean
  productCount: number
}) => (
  <Badge variant={hasProducts ? "default" : "destructive"} className="w-fit absolute top-0 right-0 ">
    {hasProducts ? (
      <div className="flex items-center gap-2">
        <Package size={14} />
        <span>{productCount} منتج</span>
      </div>
    ) : (
      <div className="flex items-center gap-2">
        <TriangleAlert size={14} />
        <span>لا توجد منتجات</span>
      </div>
    )}
  </Badge>
)

const SupplierCardHeader = ({ name }: {
  name: string
}) => (
  <CardHeader className="space-y-4 p-4">
    <div className="flex flex-col items-end gap-2">
      <CardTitle className="text-lg font-bold">{name}</CardTitle>
    </div>
  </CardHeader>
)

const SupplierLogo = ({ logo, name, hasProducts, productCount }: {
  logo: string | null
  name: string
  hasProducts: boolean
  productCount: number
}) => (
  <div className="relative flex  items-center gap-2 w-full">
    <CardImage
      imageUrl={logo || undefined}
      altText={`شعار ${name}`}
      aspectRatio="square"
      fallbackSrc="/default-logo.png"
      className="rounded-lg border w-24 h-24"
    />
    <ProductCountBadge hasProducts={hasProducts} productCount={productCount} />
  </div>
)

const ProductManagementLink = ({ hasProducts, supplierId }: {
  hasProducts: boolean
  supplierId: string
}) => (
  <Link
    href={`/dashboard/products?supplierId=${supplierId}`}
    className={buttonVariants({
      variant: hasProducts ? "secondary" : "outline",
      size: "sm",
      className: `w-full text-center text-sm flex items-center gap-2 ${hasProducts ? "" : "border-destructive/40"
        }`,
    })}
  >
    {hasProducts ? "إدارة المنتجات" : "إضافة منتج"}
  </Link>
)

const ActionButtons = ({ supplier }: SupplierCardProps) => (
  <div className="flex justify-end w-full gap-2">
    < EditSupplierDialog supplier={supplier} />
    <DeleteSupplierAlert supplierId={supplier.id} />
  </div>
)

const SupplierCard: React.FC<SupplierCardProps> = ({ supplier }) => {


  const hasProducts = supplier.productCount > 0






  return (

    <Card className="h-full flex flex-col justify-between overflow-hidden hover:shadow-sm transition-shadow">
      <SupplierCardHeader
        name={supplier.name}
      />

      <CardContent className="relative flex flex-col items-center gap-4 p-4">
        <SupplierLogo
          logo={supplier.logo}
          name={supplier.name}
          hasProducts={hasProducts}
          productCount={supplier.productCount}
        />
        <Separator />
        <ProductManagementLink
          hasProducts={hasProducts}
          supplierId={supplier.id}
        />
      </CardContent>

      <CardFooter className="p-4 bg-muted/50">
        <ActionButtons supplier={supplier} />
      </CardFooter>
    </Card>

  )
}

SupplierCard.displayName = "SupplierCard"
export default SupplierCard




