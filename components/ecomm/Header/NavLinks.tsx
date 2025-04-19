"use client";
import {
  Info,
  Phone,
  Store,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

import Link from '@/components/link';

// Define the NavLink type
interface NavLink {
  name: string;
  href: string;
  icon: React.ReactNode; // Keep as React.ReactNode for simplicity
}

export default function NavLinks() {
  const pathname = usePathname();

  const navLinks: NavLink[] = [
    {
      name: "المتجر",
      href: "/",
      icon: <Store size={20} />, // No className here
    },

    {
      name: "من نحن",
      href: "/about",
      icon: <Info size={20} />, // No className here
    },
    {
      name: "تواصل معنا",
      href: "/contact",
      icon: <Phone size={20} />, // No className here
    },
  ];

  return (
    <nav className="flex md:flex-row flex-col md:gap-4 gap-2">
      {navLinks.map((link, index) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={index}
            href={link.href}
            aria-label={link.name}
            className={`flex items-center gap-2 px-3 py-1 text-base font-medium transition-colors duration-300 rounded-lg ${isActive
              ? "bg-green-500 text-white" // Active link styles
              : "text-foreground hover:text-primary hover:bg-primary/10"
              }`}
          >
            {/* Apply white color to the icon when active */}
            <span
              className={isActive ? "text-white" : "text-primary"} // Conditionally apply text color
            >
              {link.icon}
            </span>
            <span>{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
