import React from 'react';
import Link from 'next/link';
import { menuGroups } from '../helpers/mainMenu';

export default function Sidebar() {
  return (
    <aside className="w-full md:w-64 bg-white border-r min-h-screen p-4 flex flex-col gap-6">
      {menuGroups.map((group, i) => (
        <div key={i}>
          <div className="font-bold text-gray-700 mb-2 text-right">{group.label}</div>
          <ul className="space-y-2">
            {group.items.map(item => (
              <li key={item.url}>
                <Link href={item.url} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition text-right">
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="flex-1">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
