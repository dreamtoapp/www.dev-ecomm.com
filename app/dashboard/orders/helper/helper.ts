export const STATUS_STYLES: Record<
  string,
  {
    border: string;
    color: string;
  }
> = {
  Pending: {
    border: "border-0 border-r-8 border-primary",
    color: "bg-primary text-primary-foreground",
  },
  Delivered: {
    border: "border-0  border-r-8 border-green-500",
    color: "bg-green-500 text-primary-foreground",
  },
  InWay: {
    border: "border-0 border-r-8 border-purple-500",
    color: "bg-purple-500 text-primary-foreground",
  },
  canceled: {
    border: "border-0 border-r-8 border-red-500",
    color: "bg-red-500 text-primary-foreground",
  },
  Default: {
    border: "border-0 border-r-8 border-gray-300",
    color: "bg-gray-500 text-primary-foreground",

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


