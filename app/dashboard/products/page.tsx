import Image from "next/image";
import ProductCard from "./components/ProductCard";
import AddProductDialog from "./components/AddProductDialog";
import { getProductsBySupplier } from "./actions";

interface ProductsPageProps {
  searchParams: Promise<{ supplierId: string }>;
}

function SupplierCard({ supplier }: { supplier: any }) {
  return (
    <div className="bg-gradient-to-br from-card to-muted shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 border border-border">
      {/* Logo */}
      <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-primary shadow">
        {supplier.logo ? (
          <Image
            src={supplier.logo}
            alt={`${supplier.name} logo`}
            fill
            className="object-cover object-center"
            priority
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No Logo</span>
          </div>
        )}
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-semibold truncate">{supplier.name}</h2>
        <div className="flex flex-wrap gap-2 mt-2 text-muted-foreground text-sm">
          <span title={supplier.email}><i className="fa fa-envelope mr-1" />{supplier.email}</span>
          <span title={supplier.phone}><i className="fa fa-phone mr-1" />{supplier.phone}</span>
          <span title={supplier.address}><i className="fa fa-map-marker-alt mr-1" />{supplier.address}</span>
        </div>
      </div>
      {/* Add Product + Count */}
      <div className="flex flex-col items-end gap-2">
        <AddProductDialog supplierId={supplier.id} />
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs">
          {supplier.products.length} منتج
        </span>
      </div>
    </div>
  );
}

function ProductsTableHeader() {
  return (
    <div className="hidden sm:grid grid-cols-[7rem_1fr_1fr_1fr_2fr_7rem] w-full px-2 py-2 border-b border-border bg-muted font-bold text-sm text-muted-foreground rounded-t-xl">
      <span className="text-center">الصورة</span>
      <span className="text-center">الاسم</span>
      <span className="text-center">الحجم</span>
      <span className="text-center">السعر</span>
      <span className="text-center">التفاصيل</span>
      <span className="text-center">إجراء</span>
    </div>
  );
}

function ProductsGrid({ products, supplierId }: { products: any[]; supplierId: string }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <img src="/empty-box.svg" alt="No products" className="w-32 h-32 mb-4 opacity-80" />
        <p className="text-muted-foreground text-lg mb-2">لا توجد منتجات حتى الآن</p>
        <AddProductDialog supplierId={supplierId} />
      </div>
    );
  }
  return (
    <div className="w-full">
      <ProductsTableHeader />
      <div className="flex flex-col w-full">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Await searchParams to resolve it
  const params = await searchParams;
  const supplierId = params.supplierId;

  // Fetch supplier and products based on supplierId
  const supplierResponse = await getProductsBySupplier(supplierId);
  if (!supplierResponse) {
    return (
      <div className="p-6 space-y-6 bg-background text-foreground">
        <h1 className="text-3xl font-bold">ادارة المنتجات</h1>
   
        <div className="bg-card shadow-md rounded-lg p-6 text-center">
          <p className="text-destructive">لا توجد بيانات</p>
        </div>
      </div>
    );
  }

  // Handle cases where the supplier is not found or an error occurs
  if (!supplierResponse.success) {
    return (
      <div className="p-6 space-y-6 bg-background text-foreground">
        <h1 className="text-3xl font-bold">ادارة المنتجات</h1>
        <div className="bg-card shadow-md rounded-lg p-6 text-center">
          <p className="text-destructive">{supplierResponse.message}</p>
        </div>
      </div>
    );
  }

  // Ensure supplier data is defined
  const supplier = supplierResponse.data;
  if (!supplier) {
    return (
      <div className="p-6 space-y-6 bg-background text-foreground">
        <h1 className="text-3xl font-bold">ادارة المنتجات</h1>
        <div className="bg-card shadow-md rounded-lg p-6 text-center">
          <p className="text-destructive">Supplier data is missing.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-background text-foreground">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-2">ادارة المنتجات</h1>
      <SupplierCard supplier={supplier} />
      <ProductsGrid products={supplier.products} supplierId={supplier.id} />
    </div>
  );
}
