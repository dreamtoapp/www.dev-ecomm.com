"use client";
import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react';

import Link from '@/components/link';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';

import { menuGroups } from '../helper/menuItem';

export default function DashboardSidebar() {
  // Track which groups are open (default: first group open)
  const [openGroups, setOpenGroups] = useState(() => menuGroups.map((_, i) => i === 0));

  const toggleGroup = (idx: number) => {
    setOpenGroups(openGroups => openGroups.map((open, i) => (i === idx ? !open : open)));
  };

  return (
    <Sidebar collapsible='icon' variant='inset' side="right" >
      <SidebarHeader className='bg-background shadow-xl'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/' className='text-sky-700 hover:text-sky-600 '>
                <ArrowLeft />
                <span>العودة للمتجر  </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className='bg-background'>
        {menuGroups.map((group, idx) => (
          <SidebarGroup key={group.label}>
            <button
              type="button"
              className="w-full flex items-center justify-between bg-secondary text-secondary-foreground rounded-none px-2 py-2 font-semibold focus:outline-none focus-visible:ring-2"
              onClick={() => toggleGroup(idx)}
              aria-expanded={openGroups[idx]}
              aria-controls={`sidebar-group-content-${idx}`}
            >
              <span>{group.label}</span>
              {openGroups[idx] ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            <SidebarGroupContent id={`sidebar-group-content-${idx}`} className={openGroups[idx] ? 'block' : 'hidden'}>
              <SidebarMenu>
                {group.items.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className='hover:bg-primary hover:text-primary-foreground flex items-center gap-2 justify-end'
                        target={item.newTab ? '_blank' : '_self'}
                        tabIndex={0}
                        aria-label={item.title}
                      >
                        <item.icon className='w-5 h-5' />
                        <span className='sidebar-label'>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
