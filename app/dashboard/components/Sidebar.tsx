import React, { useState } from 'react';
import Link from 'next/link';
import { menuGroups } from '../helpers/mainMenu';
import SidebarHeader from "./SidebarHeader";
import { UserCircle, ChevronDown, ChevronUp } from "lucide-react";


type SidebarMenuItemProps = { item: any; level?: number };
function SidebarMenuItem({ item, level = 0 }: SidebarMenuItemProps) {
  const [open, setOpen] = useState(false);
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  if (hasChildren) {
    return (
      <>
        <div
          className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition text-right cursor-pointer ${level > 0 ? 'pl-6' : ''}`}
          onClick={() => setOpen(o => !o)}
        >
          <item.icon className="w-5 h-5 text-primary" />
          <span className="flex-1">{item.title}</span>
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
        {open && (
          <ul className="space-y-1 border-r border-gray-100 ml-2">
            {item.children.map((child: any) => (
              <li key={child.url}>
                <SidebarMenuItem item={child} level={level + 1} />
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
  // No children: render as a link
  return (
    <Link href={item.url} className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition text-right ${level > 0 ? 'pl-6' : ''}`}>
      <item.icon className="w-5 h-5 text-primary" />
      <span className="flex-1">{item.title}</span>
    </Link>
  );
}

export default function Sidebar() {
  const [openGroup, setOpenGroup] = useState<number | null>(0); // First group open by default
  return (
    <aside className="w-full md:w-64 bg-white border-r min-h-screen flex flex-col gap-4 p-0">
      <SidebarHeader />
      <div className="flex flex-col items-center py-4 border-b mb-2">
        <UserCircle className="w-12 h-12 text-gray-400 mb-2" />
        <span className="font-semibold text-gray-700">اسم المستخدم</span>
      </div>
      <nav className="flex-1 overflow-y-auto px-4 pt-2">
        {menuGroups.map((group, i) => (
          <div key={i} className="mb-2">
            <div
              className="font-bold text-gray-700 mb-2 text-right flex items-center justify-between cursor-pointer select-none"
              onClick={() => setOpenGroup(openGroup === i ? null : i)}
            >
              <span>{group.label}</span>
              {openGroup === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
            {openGroup === i && (
              <ul className="space-y-1">
                {group.items.map(item => (
                  <li key={item.url}>
                    <SidebarMenuItem item={item} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}

