export const STATUS_STYLES: Record<
  string,
  {
    border: string;
    bgLight: string;
    bgDark: string;
    textLight: string;
    textDark: string;
  }
> = {
  Pending: {
    border: "border-l-4 border-yellow-500",
    bgLight: "bg-yellow-50",
    bgDark: "dark:bg-yellow-900/30",
    textLight: "text-yellow-800",
    textDark: "dark:text-yellow-200",
  },
  Delivered: {
    border: "border-l-4 border-green-500",
    bgLight: "bg-green-50",
    bgDark: "dark:bg-green-900/30",
    textLight: "text-green-800",
    textDark: "dark:text-green-200",
  },
  InWay: {
    border: "border-l-4 border-purple-500",
    bgLight: "bg-purple-50",
    bgDark: "dark:bg-purple-900/30",
    textLight: "text-purple-800",
    textDark: "dark:text-purple-200",
  },
  canceled: {
    border: "border-l-4 border-red-500",
    bgLight: "bg-red-50",
    bgDark: "dark:bg-red-900/30",
    textLight: "text-red-800",
    textDark: "dark:text-red-200",
  },
  Default: {
    border: "border-l-4 border-gray-300",
    bgLight: "bg-gray-50",
    bgDark: "dark:bg-gray-800",
    textLight: "text-gray-800",
    textDark: "dark:text-gray-200",
  },
};

export const STATUS_TRANSLATIONS = {
  Delivered: "تم التسليم",
  canceled: "ملغى",
  Returned: "مرتجع",
  InWay: "في الطريق",
  Pending: "قيد الانتظار",
  Default: "حالة غير معروفة",
};
