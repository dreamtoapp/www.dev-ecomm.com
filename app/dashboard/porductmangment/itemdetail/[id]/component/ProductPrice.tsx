import { Tag } from "lucide-react";

interface ProductPriceProps {
  price: number;
  isEditing?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Displays the product price, editable if isEditing is true
const ProductPrice: React.FC<ProductPriceProps> = ({ price, isEditing, value, onChange }) => (
  <div className="bg-card p-4 rounded-xl flex flex-col gap-2 border border-border">
    <div className="flex items-center gap-2 mb-1">
      <Tag className="h-5 w-5 text-primary shrink-0" />
      <h3 className="text-base md:text-lg font-semibold text-foreground">السعر</h3>
    </div>
    {isEditing ? (
      <input
        type="number"
        value={value}
        onChange={onChange}
        placeholder="السعر"
        className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    ) : (
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground text-sm md:text-base">السعر</span>
        <span className="text-xl md:text-2xl font-bold text-primary">
          ${price.toFixed(2)}
        </span>
      </div>
    )}
  </div>
);

export default ProductPrice;
