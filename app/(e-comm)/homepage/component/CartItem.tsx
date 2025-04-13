"use client";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  product: {
    id: string;
    name: string;
    price: number;
  };
  quantity: number;
  onRemove: () => void; // Function to handle item removal
}

export default function CartItem({
  product,
  quantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex justify-between items-center border-b pb-2">
      {/* Product Details */}
      <div>
        <p className="font-semibold">{product.name}</p>
        <p className="text-sm text-gray-500">
          {quantity} × ${product.price.toFixed(2)}
        </p>
      </div>

      {/* Price and Remove Button */}
      <div className="flex items-center gap-2">
        <p className="font-semibold">
          ${(product.price * quantity).toFixed(2)}
        </p>
        <Button
          variant="outline"
          size="icon"
          onClick={onRemove}
          className="text-red-500 border-red-500 hover:bg-red-100   transition"
          aria-label={`حذف المنتج ${product.name}`} // ✅ Add ARIA Label
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
}
