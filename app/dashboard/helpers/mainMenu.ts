// Main menu items for dashboard sidebar (updated URLs)
import {
  AlertTriangle,
  ListOrdered,
  Timer,
  Truck,
  Package,
  TagIcon,
  ShoppingBasket,
  Users,
  Newspaper,
  User2,
  Settings,
  Wrench,
  FileText,
  Layers,
  ShieldCheck,
  Building2,
  FileCheck,
  Eye,
  MapPin,
  Folder,
  Info,
} from 'lucide-react';

export const menuGroups = [
  {
    label: 'إدارة الطلبات',
    items: [
      { title: 'إدارة الطلبات', url: '/dashboard/orders', icon: ListOrdered },
      { title: 'جدولة الورديات', url: '/dashboard/shifts', icon: Timer },
      { title: 'إدارة السائقين', url: '/dashboard/drivers', icon: Truck },
      { title: 'إدارة الطلبات (جديد)', url: '/dashboard/orders-mangment', icon: Layers },
      { title: 'تتبع الطلبات', url: '/dashboard/track', icon: MapPin },
    ],
  },
  {
    label: 'المنتجات والعروض',
    items: [
      { title: 'إدارة المنتجات', url: '/dashboard/products-control', icon: Package },
      { title: 'العروض الترويجية', url: '/dashboard/offer', icon: TagIcon },
      { title: 'الترويسة', url: '/dashboard/promotions', icon: TagIcon },
      { title: 'إدارة الشركات', url: '/dashboard/suppliers', icon: ShoppingBasket },
    ],
  },
  {
    label: 'العملاء والتواصل',
    items: [
      { title: 'مراسلات العملاء', url: '/dashboard/clientsubmission', icon: Users },
      { title: 'النشرات الإخبارية', url: '/dashboard/clientnews', icon: Newspaper },
      { title: 'المستخدمون والصلاحيات', url: '/dashboard/users', icon: User2 },
    ],
  },
  {
    label: 'التنبيهات والتقارير',
    items: [
      { title: 'التنبيهات', url: '/dashboard/alerts', icon: AlertTriangle },
      { title: 'التقارير', url: '/dashboard/reports', icon: FileText },
      { title: 'تنبيهات الطوارئ', url: '/dashboard/fallback-alerts', icon: AlertTriangle },
    ],
  },
  {
    label: 'الإعدادات والصيانة',
    items: [
      { title: 'الإعدادات', url: '/dashboard/setting', icon: Settings },
      { title: 'الصيانة', url: '/dashboard/maintinance', icon: Wrench },
      { title: 'الشروط والأحكام', url: '/dashboard/rulesandcondtions', icon: ShieldCheck },
      { title: 'الدليل والإرشادات', url: '/dashboard/guidelines', icon: Info },
    ],
  },
  
];
