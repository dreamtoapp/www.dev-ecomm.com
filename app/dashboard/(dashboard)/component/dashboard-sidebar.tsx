import { ArrowLeft } from 'lucide-react';

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

import { menuItems } from '../helper/menuItem';

export default function DashboardSidebar() {
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
        <SidebarGroup>
          <SidebarGroupLabel className='bg-secondary text-secondary-foreground  rounded-none'>لوحة التحكم</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className='hover:bg-primary hover:text-primary-foreground' target={item.newTab ? '_blank' : '_self'}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}



