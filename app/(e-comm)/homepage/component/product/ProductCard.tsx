"use client";
import {
  memo,
  useState,
} from 'react';

import {
  Check,
  DollarSign,
  UserIcon,
} from 'lucide-react';
import Image from 'next/image';
import { FaCartPlus } from 'react-icons/fa6';

import RatingPreview from '@/components/rating/RatingPreview';
import WishlistButton from '@/components/wishlist/WishlistButton';

import { Button } from '../../../../../components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../../../../../components/ui/card';
import { Product } from '../../../../../types/product';
import Notification from '../NotificationSection';
import QuantityControls from '../QuantityControls';
import Link from '@/components/link';

// Memoized TotalPrice component
const TotalPrice = memo(({
  quantity,
  price,
}: {
  quantity: number;
  price: number;
}) => {
  return (
    <>
      {quantity !== 1 &&
        <div className="p-2 rounded-lg shadow-sm bg-secondary w-full">
          <div className="flex items-center justify-center gap-2 text-sm font-semibold text-foreground">
            <span className="md:block">الإجمالي:</span>
            <span>${(typeof price === 'number' && !isNaN(price)) ? (quantity * price).toFixed(2) : '0.00'}</span>
          </div>
        </div>
      }
    </>
  );
});

// Memoized AddToCartButton component
const AddToCartButton = memo(({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      onClick={onClick}
      className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-md rounded-full"
    >
      <FaCartPlus size={16} className="mr-2" />
      <span>أضف إلى السلة</span>
    </Button>
  );
});

// We're now using the RatingPreview component instead of custom rendering

// Product Card Component - Optimized for performance
const ProductCard = memo(({
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
  isInCart,
  showNotification,
  index,
}: {
  product: Product;
  quantity: number;
  onQuantityChange: (productId: string, delta: number) => void;
  onAddToCart: (productId: string, quantity: number, product: Product) => void;
  isInCart: boolean;
  showNotification: boolean;
  index: number;
}) => {
  // Use state for the image source
  const [imgSrc, setImgSrc] = useState(product.imageUrl || "/fallback/product-fallback.avif");

  return (
    <Card className="rounded-2xl shadow-md overflow-hidden relative bg-card border-border hover:shadow-lg transition-shadow duration-300 flex flex-col h-[500px]">
      {/* Wishlist button */}
      <div className="absolute top-3 left-3 z-10">
        <WishlistButton
          productId={product.id}
          size="sm"
          showBackground={true}
          className="hover:scale-110 transition-transform duration-200"
        />
      </div>

      {/* Cart indicator */}
      {isInCart && (
        <div className="absolute top-2 right-2 z-10 bg-green-500 text-white rounded-full p-2 shadow-lg animate-fadeIn">
          <Check size={16} />
        </div>
      )}

      <Notification show={showNotification} />

      <CardHeader className="p-0 relative">
        <Link href={`/product/${product.slug || product.id}`} className="block w-full h-48">
          <div className="w-full h-48 rounded-t-2xl overflow-hidden">
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              onError={() => {
                setImgSrc('/fallback/product-fallback.avif');
              }}
            />
          </div>
        </Link>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-4 text-center">
        {/* Product title - fixed height with ellipsis for overflow */}
        <Link href={`/product/${product.slug || product.id}`} className="hover:underline">
          <h3 className="text-base font-bold text-foreground line-clamp-1 mb-1">{product.name}</h3>
        </Link>

        {/* Product details - fixed height with ellipsis for overflow */}
        <p className="text-muted-foreground text-sm line-clamp-2 mb-2 h-10">{product.details}</p>

        {/* Rating section - NEW */}
        <div className="flex items-center justify-center mb-3">
          {(product.rating && product.rating > 0) ? (
            <RatingPreview
              productId={product.id}
              productSlug={product.slug}
              rating={product.rating}
              reviewCount={product.reviewCount || 0}
              size="sm"
              className="mx-auto"
              disableLink={true}
            />
          ) : (
            <span className="text-xs text-muted-foreground">
              لا توجد تقييمات بعد
            </span>
          )}
        </div>

        {/* Spacer to push content to top and bottom */}
        <div className="flex-grow min-h-[10px]"></div>

        {/* Price section */}
        <div className="flex justify-between items-center text-sm font-semibold text-foreground mb-2">
          <div className="flex items-center justify-center gap-2 w-full">
            <DollarSign size={16} className="text-amber-500" />
            <span>{(typeof product.price === 'number' && !isNaN(product.price)) ? product.price.toFixed(2) : '0.00'} </span>
          </div>
          <TotalPrice quantity={quantity} price={product.price} />
        </div>

        {/* Quantity controls */}
        {product.outOfStock ? null : <QuantityControls
          quantity={quantity}
          onDecrease={() => {
            onQuantityChange(product.id, -1);
          }}
          onIncrease={() => {
            onQuantityChange(product.id, 1);
          }}
        />}
      </CardContent>

      <CardFooter className="h-[80px] flex flex-col justify-center items-center gap-2">
        {!product.outOfStock ? (
          <>
            <AddToCartButton
              onClick={() => {
                onAddToCart(product.id, quantity, product);
              }}
            />
            <Link
              href={`/product/${product.slug || product.id}`}
              className="text-sm text-primary hover:underline"
            >
              عرض المنتج
            </Link>
          </>
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <div className="bg-red-500 text-white rounded-2xl px-3 py-1 shadow-lg w-full flex items-center justify-center">
              غير متوفر
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-md rounded-full w-full">
              <UserIcon size={16} className="mr-2" />
              <span>تواصل مع المبيعات</span>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
});

// Component is already memoized in its definition
export default ProductCard;
