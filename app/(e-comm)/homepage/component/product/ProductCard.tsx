import { motion } from 'framer-motion';
import {
  Check,
  DollarSign,
  UserIcon,
} from 'lucide-react';
import Image from 'next/image';
import { FaCartPlus } from 'react-icons/fa6';

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

// Product Card Component
const ProductCard = ({
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
  index: number;
  onQuantityChange: (productId: string, delta: number) => void;
  onAddToCart: (productId: string, quantity: number, product: Product) => void;
  isInCart: boolean;
  showNotification: boolean;
}) => {
  return (
    <Card className="rounded-2xl shadow-md overflow-hidden relative bg-card border-border hover:shadow-lg transition-shadow duration-300">
      {isInCart && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute top-2 right-2 z-10 bg-green-500 text-white rounded-full p-2 shadow-lg"
        >
          <Check size={16} />
        </motion.div>
      )}

      <Notification show={showNotification} />

      <CardHeader className="p-0 relative">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-40 object-cover rounded-t-2xl transition-transform duration-300 hover:scale-105"
          // priority
          priority={index < 4}
        />
      </CardHeader>

      <CardContent className="space-y-2 p-4 text-center">
        <h3 className="text-base font-bold text-foreground">{product.name}</h3>
        <p className="text-muted-foreground">{product.details}</p>

        <div className="flex justify-between items-center text-sm font-semibold text-foreground  ">
          <div className="flex items-center justify-center gap-2 w-full">
            <DollarSign size={16} className="text-amber-500" />
            <span>{product.price.toFixed(2)} </span>
          </div>
          <TotalPrice quantity={quantity} price={product.price} />
        </div>

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

      <CardFooter className="flex justify-evenly items-center flex-col gap-2">
        {!product.outOfStock ? <AddToCartButton
          onClick={() => {
            onAddToCart(product.id, quantity, product);
          }}

        /> : (
          <div className="flex flex-col gap-2">
            <div className="bg-red-500 text-white rounded-2xl px-3 py-1 shadow-lg w-full flex items-center justify-center">
              غير متوفر</div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-md rounded-full">
              <UserIcon size={16} className="mr-2" />
              <span>تواصل مع المبيعات</span>
            </Button>
          </div>)}

      </CardFooter>
    </Card>
  );
};

const TotalPrice = ({
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
            <span>${(quantity * price).toFixed(2)}</span>
          </div>

        </div>
      }
    </>
  );
};

const AddToCartButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      onClick={onClick}
      className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-md rounded-full"
    >
      <FaCartPlus size={16} className="mr-2" />
      <span>أضف إلى السلة</span>
    </Button>
  );
};

export default ProductCard;
