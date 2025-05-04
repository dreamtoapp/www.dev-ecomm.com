"use client";
import { useState } from 'react';

import { Gift } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { formatCurrency } from '../../../../lib/formatCurrency';
import { useCartStore } from '../../../../store/cartStore';
import DeleteItemDialog from './DeleteItem';

interface CartItemProps {
  product: {
    id: string;
    name: string;
    price: number;
    type: string;
    imageUrl: string;
    details: string | null;
  };
  quantity: number;
}

const CartItem = ({ product, quantity }: CartItemProps) => {
  const { removeItem, updateQuantity } = useCartStore();
  const [imgSrc, setImgSrc] = useState<string>(product.imageUrl);

  // Check if the product is an offer
  const isOffer = product.type === "offer";

  return (
    <Card
      className={`p-4 transition-all hover:shadow-md dark:hover:shadow-gray-800/50 max-w-3xl border-2 rounded-xl relative overflow-hidden ${isOffer
        ? "border-gradient bg-gradient-to-r from-primary/10 to-secondary/10" // Gradient background for offers
        : "border-border bg-background" // Default background for regular products
        }`}
    >
      {/* Offer Text in the Background */}
      {isOffer && (
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <span className="text-6xl font-bold text-primary rotate-[-30deg]">
            عرض
          </span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 w-full relative z-10">
        {/* Product Image */}
        <div className="relative w-full lg:w-32 aspect-square rounded-lg overflow-hidden">
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 128px"
            onError={() => {
              // Fallback to a local placeholder image if the original image fails to load
              setImgSrc("/fallback/fallback.avif");
            }}
            quality={80}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+"
          />
          {/* Offer Badge */}
          {isOffer && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white flex items-center gap-1">
              {" "}
              {/* Changed to red */}
              <Gift size={14} /> عرض
            </Badge>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="space-y-2">
            {/* Product Name */}
            <h3
              className={`text-lg font-semibold line-clamp-2 ${isOffer ? "text-primary" : "text-foreground"
                }`}
            >
              {product.name}
            </h3>
            {/* Product Details */}
            {product.details && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.details}
              </p>
            )}
            {/* Price per Item */}
            <p className="text-sm text-muted-foreground">
              {formatCurrency(product.price)} each
            </p>
          </div>

          {/* Controls Section */}
          <div className="flex flex-col sm:flex-row lg:flex-row items-center gap-4 w-full">
            {/* Quantity Controls */}
            <div
              className={`flex items-center border rounded-lg ${isOffer ? "border-primary" : "border-border"
                }`}
            >
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 w-8 px-0 rounded-r-none ${isOffer ? "hover:bg-primary/20" : "hover:bg-primary/10"
                  }`}
                onClick={() => updateQuantity(product.id, -1)}
                disabled={quantity <= 1}
              >
                −
              </Button>
              <span className="w-10 text-center text-sm font-medium text-foreground">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 w-8 px-0 rounded-l-none ${isOffer ? "hover:bg-primary/20" : "hover:bg-primary/10"
                  }`}
                onClick={() => updateQuantity(product.id, 1)}
              >
                +
              </Button>
            </div>

            {/* Total Price */}
            <p
              className={`text-lg font-semibold ${isOffer ? "text-primary" : "text-foreground"
                }`}
            >
              {formatCurrency(product.price * quantity)}
            </p>

            {/* Delete Button */}
            <div className="flex items-center justify-end flex-1">
              <DeleteItemDialog
                productId={product.id}
                productName={product.name}
                removeItem={removeItem}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CartItem;
