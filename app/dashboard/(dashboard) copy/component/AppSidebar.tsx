"use client";
import {
  memo,
  useEffect,
  useState,
} from 'react'

import {
  Drama,
  File,
  FileText,
  ListOrdered,
  LogOut,
  Newspaper,
  Package,
  Settings,
  ShoppingBasket,
  Timer,
  Truck,
  User2,
  Users,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

import Text from '@/components/Text'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
} from '@/components/ui/sidebar'

import ThemeToggle from '../../../../components/ThemeToggle'

// Centralized UI text for localization
const UI_TEXT = {
  header: {
    logoAlt: "امواج للمياة الصحية",
  },
  navigationGroups: [
    {
      title: "الرئسية",
      links: [
        {
          label: "ادارة الطلبيات",
          href: "/dashboard",
          icon: <ListOrdered className="h-5 w-5 text-muted-foreground ml-2" />,
        },
        {
          label: "ادارة الشركات",
          href: "/dashboard/suppliers",
          icon: (
            <ShoppingBasket className="h-5 w-5 text-muted-foreground ml-2" />
          ),
        },
        {
          label: "ادارة المنتجات",
          href: "/dashboard/porductmangment",
          icon: <Package className="h-5 w-5 text-muted-foreground ml-2" />,
        },
        {
          label: "مراسلات العملاء",
          href: "/dashboard/clientsubmission",
          icon: <Users className="h-5 w-5 text-muted-foreground ml-2" />,
        },
        {
          label: "النشرة الاخبارية",
          href: "/dashboard/clientnews",
          icon: <Newspaper className="h-5 w-5 text-muted-foreground ml-2" />,
        },
      ],
    },
    {
      title: "اداري",
      links: [
        {
          label: "ادارة السواقين ",
          href: "/dashboard/drivers",
          icon: <Truck className="h-5 w-5 text-muted-foreground ml-2" />,
        },


        {
          label: "المستخدمين",
          href: "/dashboard/users",
          icon: (
            <User2 className="h-5 w-5 text-muted-foreground ml-2 border-b border-red-500" />
          ),
        },
      ],
    },
    {
      title: "اعدادات المتجر",
      links: [
        {
          label: "الوردبات",
          href: "/dashboard/shifts",
          icon: <Timer className="h-5 w-5 text-muted-foreground ml-2" />,
        },
        {
          label: "الترويسة",
          href: "/dashboard/promotions",
          icon: <Drama className="h-5 w-5 text-muted-foreground ml-2" />,
        },
        {
          label: "الشروظ والاحطام",
          href: "/dashboard/rulesandcondtions",
          icon: <FileText className="h-5 w-5 text-muted-foreground ml-2" />,
        },
        {
          label: "الاعدادت",
          href: "/dashboard/setting",
          icon: <Settings className="h-5 w-5 text-muted-foreground ml-2" />,
        },
      ],
    },
  ],
  footer: {
    logout: "تسجيل الخروج",
    toggleTheme: {
      light: "تبديل إلى الوضع النهاري",
      dark: "تبديل إلى الوضع الليلي",
    },
  },
};

// Reusable Navigation Link Component
const NavItem = memo(
  ({
    href,
    label,
    icon,
  }: {
    href: string;
    label: string;
    icon: React.ReactNode;
  }) => {
    return (
      <Link
        href={{ pathname: href }}
        className="flex items-center w-full py-1.5 px-3 text-sm rounded-md hover:bg-blue-400 hover:text-white transition-colors"
        aria-label={label} // Add ARIA label for accessibility
      >
        {/* Icon */}
        <span className="mr-2">{icon}</span>
        {/* Label */}
        <Text variant="p" locale="ar" className="font-cairo text-sm ">
          {label}
        </Text>
      </Link>
    );
  }
);

NavItem.displayName = "NavItem"; // Required for React.memo with TypeScript

export function AppSidebar() {
  const { resolvedTheme, setTheme } = useTheme(); // Use resolvedTheme from next-themes
  const [mounted, setMounted] = useState(false); // Track if the component is mounted

  // Ensure the component is mounted before accessing client-side APIs
  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering theme toggle until mounted
  if (!mounted) {
    return null;
  }

  // Use resolvedTheme to determine if the theme is dark

  return (
    <Sidebar side="right">
      <SidebarContent className="p-2 ">
        {UI_TEXT.navigationGroups.map((group, index) => (
          <SidebarGroup key={index}>
            {/* Group Title */}
            <Text
              className="font-semibold text-sm mb-1"
              variant="p"
              locale="ar"
              cairoFont
            >
              {group.title}
            </Text>
            {/* Navigation Links */}
            <div className="space-y-1">
              {group.links.map((link, idx) => (
                <NavItem
                  key={idx}
                  href={link.href}
                  label={link.label}
                  icon={link.icon}
                />
              ))}
            </div>
          </SidebarGroup>
        ))}
      </SidebarContent>
      {/* Footer */}
      <SidebarFooter className="p-4 border-t flex items-center flex-row justify-around">
        <Link href={"/"}>
          <LogOut size={16} />
        </Link>

        <Link href={{ pathname: "/khalidnadish" }}>
          <File size={16} />
        </Link>

        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
