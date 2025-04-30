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
  BarChart2,
  TrendingUp,
  UserCheck,
  DollarSign,
  ClipboardList,
  Gift,
  Star,
  ThumbsUp,
  Award,
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
    label: 'التقارير',
    items: [
      {
        title: 'التقارير',
        url: '/dashboard/reports',
        icon: FileText,
        children: [
          { title: 'تقرير المبيعات', url: '/dashboard/reports/sales', icon: TrendingUp },
          { title: 'التقارير المالية', url: '/dashboard/reports/finance', icon: DollarSign },
          { title: 'تقرير أداء المنتجات', url: '/dashboard/reports/product-performance', icon: BarChart2 },
          { title: 'تقرير العملاء', url: '/dashboard/reports/customers', icon: UserCheck },
          { title: 'تحليلات الطلبات', url: '/dashboard/reports/orders', icon: ClipboardList },
          { title: 'تقرير المخزون', url: '/dashboard/reports/inventory', icon: ClipboardList },
          { title: 'تقرير العروض والتخفيضات', url: '/dashboard/reports/promotions', icon: Gift },
          { title: 'تقرير السائقين والتوصيل', url: '/dashboard/reports/drivers', icon: Truck },
          { title: 'تقرير التقييمات والمراجعات', url: '/dashboard/reports/reviews', icon: Star },
          { title: 'الإنجازات والأرقام القياسية', url: '/dashboard/reports/milestones', icon: Award },
        ],
      },
    ],
  },
  {
    label: 'المصروفات',
    items: [
      { title: 'المصروفات', url: '/dashboard/expenses', icon: ClipboardList },
    ],
  },
  {
    label: 'التنبيهات',
    items: [
      { title: 'التنبيهات', url: '/dashboard/alerts', icon: AlertTriangle },
      { title: 'تنبيهات الطوارئ', url: '/dashboard/fallback-alerts', icon: AlertTriangle },
    ],
  },
  {
    label: 'الإعدادات والمساعدة',
    items: [
      { title: 'الإعدادات', url: '/dashboard/settings', icon: Settings },
      { title: 'الدعم الفني', url: '/dashboard/support', icon: Wrench },
      { title: 'الدليل والإرشادات', url: '/dashboard/guidelines', icon: Info },
    ],
  },
];
