"use client"
import React from 'react';
import { ChevronLeftIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { menuGroups } from '../../helpers/mainMenu';

import type { ElementType } from 'react';

type MenuItem = {
  title: string;
  url: string;
  icon?: ElementType;
  children?: MenuItem[];
};

function normalizePath(path: string): string {
  return path.replace(/\/$/, '');
}

type MenuItemWithParent = { item: MenuItem; parentLabel: string | null };

function findMenuItemWithParent(items: MenuItem[], pathname: string, parentLabel: string | null = null): MenuItemWithParent | null {
  for (const item of items) {
    if (normalizePath(item.url) === normalizePath(pathname)) {
      return { item, parentLabel };
    }
    if (item.children && Array.isArray(item.children)) {
      const found = findMenuItemWithParent(item.children, pathname, item.title);
      if (found) return found;
    }
  }
  return null;
}

function CurrentLinkTitle() {
  const pathname = usePathname();

  let currentItem: MenuItem | null = null;
  let groupLabel: string | null = null;

  for (const group of menuGroups) {
    const found = findMenuItemWithParent(group.items, pathname);
    if (found) {
      currentItem = found.item;
      groupLabel = found.parentLabel ? found.parentLabel : group.label;

      break;
    }
  }


  const pageTitle = pathname === "/dashboard" ? "الرئيسية" : (currentItem?.title || "صفحة غير معروفة");
  const PageIcon = currentItem?.icon;

  return (
    <div className="p-4 rounded-md flex flex-col items-start gap-1 rtl:text-right">
      {groupLabel && (
        <span className="text-xs text-muted-foreground font-semibold mb-1">{groupLabel}</span>
      )}
      <div className="flex items-center gap-2">
        {PageIcon && <PageIcon className="w-6 h-6 text-primary" />}
        <h1 className="font-bold text-lg">{pageTitle}</h1>
        <ChevronLeftIcon className="w-5 h-5 text-muted-foreground" />
      </div>
    </div>
  );
}

export default CurrentLinkTitle;