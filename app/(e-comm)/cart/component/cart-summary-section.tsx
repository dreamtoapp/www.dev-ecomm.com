import CartSummary from './CartSummary'

const CartSummarySection = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="sticky top-24 bg-card text-foreground p-5 rounded-xl shadow-lg dark:shadow-gray-800/50 w-full max-w-sm self-start">
      {isLoading ? (
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-48 rounded-lg space-y-4 p-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
          <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      ) : (
        <CartSummary />
      )}
    </div>
  );
};
export default CartSummarySection