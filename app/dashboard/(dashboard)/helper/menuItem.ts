import {
  Drama,
  FileText,
  ListOrdered,
  Newspaper,
  Package,
  Settings,
  ShoppingBasket,
  TagIcon,
  Timer,
  Truck,
  User2,
  Users,
  Wrench,
} from 'lucide-react';
import { FaCode } from 'react-icons/fa';

export const menuItems = [
  {
    title: "إدارة الطلبات",
    url: "/dashboard",
    icon: ListOrdered,
  },
  {
    title: "إدارة الشركات",
    url: "/dashboard/suppliers",
    icon: ShoppingBasket,
  },
  {
    title: "العروض الترويجية",
    url: "/dashboard/offer",
    icon: TagIcon,
  },
  {
    title: "إدارة المنتجات",
    url: "/dashboard/productmanagement",
    icon: Package,
  },
  {
    title: "مراسلات العملاء",
    url: "/dashboard/clientsubmission",
    icon: Users,
  },
  {
    title: "النشرات الإخبارية",
    url: "/dashboard/clientnews",
    icon: Newspaper,
  },
  {
    title: "إدارة السائقين",
    url: "/dashboard/drivers",
    icon: Truck,
  },
  {
    title: "المستخدمون والصلاحيات",
    url: "/dashboard/users",
    icon: User2,
  },
  {
    title: "جدولة الورديات",
    url: "/dashboard/shifts",
    icon: Timer,
  },
  {
    title: "الترويج والعروض",
    url: "/dashboard/promotions",
    icon: Drama,
  },
  {
    title: "الشروط والسياسات",
    url: "/dashboard/rulesandconditions",
    icon: FileText,
  },
  {
    title: "الإعدادات العامة",
    url: "/dashboard/setting",
    icon: Settings,
  },
  {
    title: "لوحة المطور",
    url: "/dashboard/setting",
    icon: FaCode,
  },
  {
    title: "صيانة النظام",
    url: "/dashboard/setting",
    icon: Wrench,
  },
];

