import CheckOut from './check-out-button'

const CheckOutSection = ({
  isLoading,
  totalWithTax,
  getTotalItems,
}: {
  isLoading: boolean;
  totalWithTax: number;
  getTotalItems: () => number;
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0    flex justify-center gap-4  bg-primary/30 z-50   p-2">
      {isLoading ? (
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-12 w-48 rounded-lg"></div>
      ) : (
        <CheckOut amount={totalWithTax} productCount={getTotalItems()} />
      )}
      {/* <Shopping /> */}
    </div>
  );
};

export default CheckOutSection;