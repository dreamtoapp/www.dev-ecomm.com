import CartItem from './CartItem'

const CartItemsList = ({
  cart,
  isLoading,
}: {
  cart: any;
  isLoading: boolean;
}) => {
  return (
    <div className="space-y-6">
      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded-lg flex space-x-4 p-4"
          >
            <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
            </div>
          </div>
        ))
        : Object.values(cart).map(({ product, quantity, type }: any) => (
          <CartItem
            key={product.id} // استخدام key بشكل صحيح مع معرف المنتج
            product={product}
            quantity={quantity}
          />
        ))}
    </div>
  );
};
export default CartItemsList;