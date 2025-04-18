import {
  AlertCircle,
  MapPin,
  MapPinOff,
} from 'lucide-react';

import Link from '@/components/link';
import { cn } from '@/lib/utils';
import { User } from '@/types/user';

const CheckUserLocation = ({ user }: { user?: User }) => {
  if (!user?.id || (user.latitude && user.longitude)) return null;

  return (
    <div className="mb-4">
      <div
        className={cn(
          "flex flex-col sm:flex-row items-center justify-between w-full p-4 rounded-lg border",
          "bg-warning/10 border-warning/30 text-warning-foreground",
          "hover:bg-warning/20 transition-colors duration-200"
        )}
        role="alert" // Added for better accessibility
        aria-live="polite" // Ensures screen readers announce the alert
      >
        <div className="flex items-center gap-3 mb-3 sm:mb-0">
          <div className="relative">
            <MapPinOff className="h-6 w-6" aria-hidden="true" /> {/* Marked as decorative */}
            <AlertCircle
              className="absolute -right-1 -top-1 h-3 w-3 animate-pulse"
              fill="currentColor"
              aria-hidden="true" // Marked as decorative
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm sm:text-base">الموقع الجغرافي مطلوب</span>
            <span className="text-xs opacity-80">
              يرجى تحديث موقعك لإكمال الطلبات
            </span>
          </div>
        </div>

        <Link
          href={`/user/profile?id=${user.id}`}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "transition-colors duration-150 w-full sm:w-auto"
          )}
          aria-label="تحديث الموقع" // Improved accessibility
        >
          <MapPin className="h-4 w-4" aria-hidden="true" /> {/* Marked as decorative */}
          <span className="font-medium">تحديث الموقع</span>
        </Link>
      </div>
    </div>
  );
};

export default CheckUserLocation;