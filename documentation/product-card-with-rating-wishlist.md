# Product Card with Rating and Wishlist

## Design Mockup

```
┌────────────────────────────────┐
│                           ♡ ✓  │  ← Wishlist icon (♡/♥) & Cart indicator
│                                │
│                                │
│         PRODUCT IMAGE          │
│                                │
│                                │
├────────────────────────────────┤
│ Product Name                   │  ← Product title with ellipsis
│                                │
│ Product description that may   │  ← Product details with 2-line limit
│ span to multiple lines...      │
│                                │
│ ★★★★☆  4.2 (24)               │  ← Rating stars, score & review count
│                                │
│ $99.99                         │  ← Price
│                                │
│       [-]    2    [+]          │  ← Quantity controls
│                                │
├────────────────────────────────┤
│      [ADD TO CART BUTTON]      │  ← Action button
└────────────────────────────────┘
```

## Implementation Details

### 1. Wishlist Feature
- Add a heart icon (♡/♥) in the top-right corner of the card
- Toggle between outlined (♡) and filled (♥) states when clicked
- Store wishlist items in local storage or user account if logged in
- Add subtle animation when adding/removing from wishlist

### 2. Rating System
- Display 5 stars with appropriate fill based on rating
- Show average rating (e.g., 4.2) next to stars
- Show number of reviews in parentheses (e.g., (24))
- Make stars slightly smaller than other elements to maintain hierarchy
- Use appropriate color (gold/amber) for filled stars

### 3. Code Implementation

```tsx
// Add these imports
import { Heart, Star, StarHalf } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';

// Inside the ProductCard component
const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
const [isWishlisted, setIsWishlisted] = useState(isInWishlist(product.id));

const toggleWishlist = (e: React.MouseEvent) => {
  e.stopPropagation();
  if (isWishlisted) {
    removeFromWishlist(product.id);
  } else {
    addToWishlist(product);
  }
  setIsWishlisted(!isWishlisted);
};

// Render stars based on rating
const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} size={14} className="fill-amber-400 text-amber-400" />);
  }
  
  if (hasHalfStar) {
    stars.push(<StarHalf key="half" size={14} className="fill-amber-400 text-amber-400" />);
  }
  
  const remainingStars = 5 - stars.length;
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<Star key={`empty-${i}`} size={14} className="text-gray-300" />);
  }
  
  return stars;
};
```

### 4. Updated Card Layout

```tsx
<Card className="rounded-2xl shadow-md overflow-hidden relative bg-card border-border hover:shadow-lg transition-shadow duration-300 flex flex-col h-[500px]">
  {/* Wishlist button */}
  <button 
    onClick={toggleWishlist}
    className="absolute top-2 left-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200 shadow-sm"
    aria-label={isWishlisted ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
  >
    <Heart 
      size={18} 
      className={cn(
        "transition-colors duration-300",
        isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500 hover:text-red-400"
      )} 
    />
  </button>
  
  {/* Cart indicator (existing code) */}
  {isInCart && (
    <div className="absolute top-2 right-2 z-10 bg-green-500 text-white rounded-full p-2 shadow-lg animate-fadeIn">
      <Check size={16} />
    </div>
  )}
  
  {/* Rest of the card remains the same */}
  <CardHeader>...</CardHeader>
  
  <CardContent>
    {/* Product title */}
    <h3 className="text-base font-bold text-foreground line-clamp-1 mb-1">{product.name}</h3>
    
    {/* Product details */}
    <p className="text-muted-foreground text-sm line-clamp-2 mb-2 h-10">{product.details}</p>
    
    {/* Rating section - NEW */}
    <div className="flex items-center gap-1 mb-2">
      <div className="flex">{renderStars(product.rating || 0)}</div>
      <span className="text-xs text-muted-foreground">
        {product.rating?.toFixed(1) || "0.0"} ({product.reviewCount || 0})
      </span>
    </div>
    
    {/* Spacer */}
    <div className="flex-grow min-h-[10px]"></div>
    
    {/* Price section */}
    <div className="flex justify-between items-center text-sm font-semibold text-foreground mb-2">
      {/* Existing price code */}
    </div>
    
    {/* Quantity controls */}
    {/* Existing quantity controls */}
  </CardContent>
  
  <CardFooter>
    {/* Existing footer code */}
  </CardFooter>
</Card>
```

## Database Schema Updates

To support ratings and wishlist functionality, you'll need to update your Prisma schema:

```prisma
// Add to your Product model
model Product {
  // Existing fields
  id          String    @id @default(cuid())
  name        String
  price       Float
  // ...
  
  // New fields
  rating      Float?    // Average rating
  reviewCount Int       @default(0)
  reviews     Review[]  // Relation to reviews
  wishlistedBy WishlistItem[] // Relation to wishlist items
}

// New models
model Review {
  id        String   @id @default(cuid())
  rating    Int      // 1-5 stars
  comment   String?
  productId String
  userId    String
  createdAt DateTime @default(now())
  
  // Relations
  product   Product  @relation(fields: [productId], references: [id])
  user      User     @relation(fields: [userId], references: [id])
  
  @@index([productId])
  @@index([userId])
}

model WishlistItem {
  id        String   @id @default(cuid())
  productId String
  userId    String
  createdAt DateTime @default(now())
  
  // Relations
  product   Product  @relation(fields: [productId], references: [id])
  user      User     @relation(fields: [userId], references: [id])
  
  @@unique([productId, userId]) // Prevent duplicates
  @@index([userId])
}
```

## Wishlist Store Implementation

```tsx
// store/wishlistStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

interface WishlistState {
  items: Record<string, Product>;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  getWishlistCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: {},
      
      addToWishlist: (product) => 
        set((state) => ({
          items: { ...state.items, [product.id]: product }
        })),
      
      removeFromWishlist: (productId) => 
        set((state) => {
          const newItems = { ...state.items };
          delete newItems[productId];
          return { items: newItems };
        }),
      
      clearWishlist: () => set({ items: {} }),
      
      isInWishlist: (productId) => !!get().items[productId],
      
      getWishlistCount: () => Object.keys(get().items).length
    }),
    { name: "wishlist-storage" }
  )
);
```
