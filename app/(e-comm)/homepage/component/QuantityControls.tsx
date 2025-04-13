import { Button } from "../../../../components/ui/button";

const QuantityControls = ({
  quantity,
  onDecrease,
  onIncrease,
}: {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) => (
  <div className="flex items-center justify-center gap-2 mt-2">
    <Button
      variant="outline"
      size="icon"
      onClick={onDecrease}
      className="w-8 h-8 text-sm border border-border hover:bg-accent transition-colors duration-200 rounded-full"
    >
      -
    </Button>
    <span className="text-sm font-medium text-foreground">{quantity}</span>
    <Button
      variant="outline"
      size="icon"
      onClick={onIncrease}
      className="w-8 h-8 text-sm border border-border hover:bg-accent transition-colors duration-200 rounded-full"
    >
      +
    </Button>
  </div>
);

export default QuantityControls;
