"use client"
import React from 'react';
import { ChevronLeftIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { menuGroups } from '../helper/menuItem';

function CurrentLinkTitle() {
  const pathname = usePathname();
  // Flatten all menu items from groups
  const allItems = menuGroups.flatMap(group => group.items);
  const currentItem = allItems.find(item => item.url === pathname);
  const pageTitle = currentItem?.title || pathname;

  return (
    <div className="p-4 rounded-md flex items-start">
      <h1 className="font-bold">الصفحة الحالية</h1>
      <ChevronLeftIcon />
      <p className="text-muted-foreground">{pageTitle}</p>
    </div>
  );
}

export default CurrentLinkTitle;