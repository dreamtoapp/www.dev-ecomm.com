import { memo } from "react";
import { Check } from "lucide-react";

// Optimized notification using CSS animations instead of framer-motion
const Notification = memo(({ show }: { show: boolean }) => {
  if (!show) return null;

  return (
    <div
      className={`absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 animate-slideUp`}
      style={{
        willChange: 'transform, opacity',
        contain: 'content'
      }}
    >
      <span className="text-sm font-medium">تمت الإضافة!</span>
      <Check size={16} className="text-green-600 dark:text-green-400" />
    </div>
  );
});

export default Notification;
