"use client";
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  useRouter,
  useSearchParams,
} from 'next/navigation';
import {
  FaBuilding,
  FaStar,
} from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { ImSpinner8 } from 'react-icons/im';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  ScrollArea,
  ScrollBar,
} from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Supplier {
  id: string;
  name: string;
  type?: string;
  logo?: string | null;
  _count?: {
    products: number;
  };
}

interface ProductCategoryProps {
  suppliers: Supplier[];
}

// SupplierCard Component
const SupplierCard = ({
  supplier,
  selectedSupplier,
  loadingSupplierId,
  handleSelectSupplier,
}: {
  supplier: Supplier;
  selectedSupplier: Supplier | null;
  loadingSupplierId: string | null;
  handleSelectSupplier: (supplier: Supplier) => void;
}) => (
  <Tooltip key={supplier.id}>
    <TooltipTrigger asChild>
      <div
        className={`relative cursor-pointer rounded-lg p-4 transition-all flex-shrink-0 w-36 h-36 flex flex-col justify-center items-center hover:bg-accent/50 border ${selectedSupplier?.id === supplier.id
            ? "border-2 border-primary shadow-lg dark:border-blue-600"
            : "border-muted hover:border-primary dark:border-gray-700 dark:hover:border-blue-600"
          } ${supplier.type === "offer"
            ? "bg-red-100 dark:bg-red-900/50"
            : "bg-background dark:bg-gray-800"
          }`}
        onClick={() =>
          !loadingSupplierId && handleSelectSupplier(supplier)
        }
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          e.key === "Enter" && handleSelectSupplier(supplier)
        }
      >
        {loadingSupplierId === supplier.id && (
          <>
            <div className="absolute inset-0 bg-black/30 rounded-lg z-10"></div>
            <div className="absolute inset-0 flex justify-center items-center z-20">
              <ImSpinner8 className="h-8 w-8 animate-spin text-primary dark:text-blue-600" />
            </div>
          </>
        )}

        <div className="absolute top-2 left-2">
          {supplier.type === "offer" && <FaStar className="text-yellow-500" />}
          {supplier.type === "company" && <FaBuilding className="text-blue-500" />}
        </div>

        <Avatar className="w-20 h-20 mb-2 z-0">
          <AvatarImage src={supplier.logo || ""} alt={supplier.name} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold dark:bg-blue-900/20 dark:text-blue-400">
            {supplier.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="w-full text-sm font-medium text-foreground text-center truncate dark:text-gray-100">
          {supplier.name}
        </div>

        {supplier._count?.products !== undefined && (
          <Badge
            variant={supplier._count.products === 0 ? "destructive" : "default"}
            className="absolute -top-2 -right-2 shadow-sm"
          >
            {supplier._count.products === 0
              ? "لا توجد منتجات"
              : `${supplier._count.products} منتجات`}
          </Badge>
        )}
      </div>
    </TooltipTrigger>
    <TooltipContent
      side="bottom"
      className="dark:bg-gray-800 dark:text-gray-100"
    >
      <p>{supplier.name}</p>
    </TooltipContent>
  </Tooltip>
);

// FilterButtons Component
const FilterButtons = ({
  filterType,
  setFilterType,
  companyCount,
  offerCount,
}: {
  filterType: "all" | "offer" | "company";
  setFilterType: (type: "all" | "offer" | "company") => void;
  companyCount: number;
  offerCount: number;
}) => (
  <div className="flex gap-2 flex-1 min-w-[300px]">
    <Button
      variant={filterType === "company" ? "default" : "outline"}
      onClick={() => setFilterType("company")}
      className="flex-1 text-sm px-3"
    >
      الشركات ({companyCount})
    </Button>
    <Button
      variant={filterType === "offer" ? "default" : "outline"}
      onClick={() => setFilterType("offer")}
      className="flex-1 text-sm px-3"
    >
      العروض ({offerCount})
    </Button>
  </div>
);

// Main ProductCategory Component
const ProductCategory = ({ suppliers }: ProductCategoryProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [loadingSupplierId, setLoadingSupplierId] = useState<string | null>(
    null
  );
  const [filterType, setFilterType] = useState<"all" | "offer" | "company">(
    "all"
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  const allCount = suppliers.length;
  const offerCount = suppliers.filter((s) => s.type === "offer").length;
  const companyCount = suppliers.filter((s) => s.type === "company").length;

  useEffect(() => {
    const supplierName = searchParams.get("name");
    const supplierId = searchParams.get("sid");

    if (supplierName && supplierId) {
      const decodedSupplierName = decodeURIComponent(
        supplierName.replace(/-/g, " ")
      );
      const supplier = suppliers.find(
        (s) => s.id === supplierId && s.name === decodedSupplierName
      );
      if (supplier) {
        setSelectedSupplier(supplier);
        setIsFilterApplied(true);
      }
    } else {
      setSelectedSupplier(null);
      setIsFilterApplied(false);
    }
  }, [searchParams, suppliers]);

  const handleSelectSupplier = async (supplier: Supplier) => {
    setLoadingSupplierId(supplier.id);
    const cleanSupplierName = supplier.name.replace(/\s+/g, "-");
    const encodedSupplierName = encodeURIComponent(cleanSupplierName);
    const newUrl = `?name=${encodedSupplierName}&sid=${supplier.id}` as const;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push(newUrl);
    setSelectedSupplier(supplier);
    setIsFilterApplied(true);
    setLoadingSupplierId(null);
  };

  const handleRemoveFilter = async () => {
    setLoadingSupplierId("remove");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSelectedSupplier(null);
    setIsFilterApplied(false);
    router.push("/");
    setLoadingSupplierId(null);
  };

  const filteredSuppliers = suppliers
    .filter((supplier) => {
      if (filterType === "all") return true;
      return supplier.type === filterType;
    })
    .sort((a, b) => {
      if (filterType === "all") {
        if (a.type === "offer" && b.type !== "offer") return -1;
        if (a.type !== "offer" && b.type === "offer") return 1;
      }
      return 0;
    });

  return (
    <Card className="w-full max-w-screen-lg mx-auto rtl text-right shadow-lg dark:bg-gray-900 dark:border-gray-800">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <FilterButtons
            filterType={filterType}
            setFilterType={setFilterType}
            companyCount={companyCount}
            offerCount={offerCount}
          />

          {isFilterApplied && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveFilter}
                  disabled={loadingSupplierId === "remove"}
                  className="h-8 px-2 text-sm gap-1"
                >
                  {loadingSupplierId === "remove" ? (
                    <ImSpinner8 className="h-3 w-3 animate-spin" />
                  ) : (
                    <>
                      <FiX className="h-3 w-3" /> مسح الفلتر
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="dark:bg-gray-800 dark:text-gray-100"
              >
                <p>إزالة التصفية الحالية</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {filteredSuppliers.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground dark:text-gray-400">
            غير متوفر حاليا
          </div>
        ) : (
          <div className="relative">
            <ScrollArea
              ref={scrollRef}
              className="w-full rounded-lg shadow-sm"
            >
              <div className="flex space-x-4 p-4">
                {filteredSuppliers.map((supplier) => (
                  <SupplierCard
                    key={supplier.id}
                    supplier={supplier}
                    selectedSupplier={selectedSupplier}
                    loadingSupplierId={loadingSupplierId}
                    handleSelectSupplier={handleSelectSupplier}
                  />
                ))}
              </div>
              <ScrollBar
                orientation="horizontal"
                className="dark:bg-gray-700"
              />
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCategory;
