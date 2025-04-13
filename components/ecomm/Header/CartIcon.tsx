import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export default function CartIcon() {
  const { getTotalUniqueItems } = useCartStore();
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative">
      <Link
        href="/cart"
        aria-label="عرض السلة"
        className="relative flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-lg hover:bg-primary/20 transition-all duration-300 hover:scale-105"
      >
        <ShoppingCart size={20} className="text-primary" />
        <span className="hidden md:inline text-sm text-foreground font-medium">
          السلة
        </span>
        {mounted && getTotalUniqueItems() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center shadow-md animate-bounce">
            {getTotalUniqueItems()}
          </span>
        )}
      </Link>
    </div>
  );
}
