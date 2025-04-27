'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { menuGroups } from '../helpers/mainMenu';
import { Home, LayoutDashboard } from 'lucide-react';

export default function AppSidebar() {
  // For now, hardcode RTL (right side) for Arabic; in future, detect from i18n or context
  const side: 'left' | 'right' = 'right';
  const pathname = usePathname();
  const [collapsedGroups, setCollapsedGroups] = useState<number[]>([]);

  const toggleGroup = (idx: number) => {
    setCollapsedGroups(groups =>
      groups.includes(idx)
        ? groups.filter(i => i !== idx)
        : [...groups, idx]
    );
  };

  return (
    <Sidebar side={side} className="h-screen border-r bg-background flex flex-col rtl:text-right">
      <SidebarHeader className="flex flex-col items-center gap-2 p-4 border-b bg-background">
        <div className="flex items-center gap-4 w-full justify-center mb-1">
          <Link href="/" className="flex items-center justify-center rounded-lg p-2 hover:bg-accent transition">
            <Home className="w-6 h-6 text-primary" />
          </Link>
          <Link href="/dashboard" className="flex items-center justify-center rounded-lg p-2 hover:bg-accent transition">
            <LayoutDashboard className="w-6 h-6 text-primary" />
          </Link>
        </div>
        <span className="font-bold text-2xl text-primary text-center w-full">لوحة التحكم</span>
        <SidebarTrigger className="md:hidden absolute top-4 left-4" />
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto p-2">
        {menuGroups.map((group, i) => {
          const isCollapsed = collapsedGroups.includes(i);
          return (
            <SidebarGroup key={i} className="mb-4">
              <button
                className="w-full flex items-center justify-between px-2 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary transition"
                onClick={() => toggleGroup(i)}
                aria-expanded={!isCollapsed}
                aria-controls={`sidebar-group-${i}`}
              >
                <span className="text-right">{group.label}</span>
                <span className={`transition-transform ${isCollapsed ? 'rotate-180' : ''}`}>▼</span>
              </button>
              <ul
                id={`sidebar-group-${i}`}
                className={`space-y-1 transition-all duration-200 overflow-hidden ${isCollapsed ? 'max-h-0 opacity-60' : 'max-h-96 opacity-100'}`}
                style={{ direction: 'rtl' }}
              >
                {group.items.map(item => (
                  <li key={item.url}>
                    <Link
                      href={item.url}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors text-sm font-medium hover:bg-accent hover:text-accent-foreground ${pathname === item.url ? 'bg-accent text-accent-foreground font-bold' : ''}`}
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                      <span className="flex-1">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="text-xs text-muted-foreground text-center w-full"> {new Date().getFullYear()} www.amwag.com</div>
      </SidebarFooter>
    </Sidebar>
  );
}
