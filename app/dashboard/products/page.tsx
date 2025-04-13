import { notFound } from "next/navigation";
import Image from "next/image";
import ProductCard from "./components/ProductCard";
import AddProductDialog from "./components/AddProductDialog";
import { getProductsBySupplier } from "./actions/Actions";

interface ProductsPageProps {
  searchParams: Promise<{ supplierId?: string }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  // Await searchParams to resolve it
  const params = await searchParams;
  const supplierId = params.supplierId;

  if (!supplierId) {
    notFound(); // Redirect to 404 if no supplierId is provided
  }

  // Fetch supplier and products based on supplierId
  const supplierResponse = await getProductsBySupplier(supplierId);

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
      <h1 className="text-3xl font-bold">ادارة المنتجات</h1>

      {/* Supplier Information */}
      <div className="bg-card shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
        {/* Supplier Logo */}
        <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-border">
          {supplier.logo ? (
            <Image
              src={supplier.logo}
              alt={`${supplier.name} logo`}
              fill
              className="object-cover object-center"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No Logo</span>
            </div>
          )}
        </div>

        {/* Supplier Details */}
        <div className="flex-grow">
          <h2 className="text-xl font-semibold text-foreground mr-4">
            {supplier.name}
          </h2>
          {/* <p className="text-sm text-muted-foreground">
            <strong>Email:</strong> {supplier.email}
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Phone:</strong> {supplier.phone}
          </p> */}
        </div>
      </div>

      {/* Add New Item Button */}
      <div className="flex items-center justify-between">
        <AddProductDialog supplierId={supplier.id} />
        <p className="text-muted-foreground">
          Items: {supplier.products.length}
        </p>
      </div>

      {/* Product List */}
      {supplier.products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supplier.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          No products found for this supplier.
        </p>
      )}
    </div>
  );
}
