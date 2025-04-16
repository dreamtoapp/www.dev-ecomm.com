import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import {
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import { AppSidebar } from './(dashboard)/component/AppSidebar';
import PusherNotify from './(dashboard)/component/pusherNotifaction/PusherNotify';

export default async function Layout({ children }: { children: React.ReactNode }) {
  // This layout is used for the dashboard pages
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== 'admin') {
    return redirect('/auth/login');
  }

  return (
    <SidebarProvider className="overflow-hidden">
      <AppSidebar />
      <main className="w-full flex-1 max-h-screen overflow-auto">
        <div className="flex items-center justify-between px-4 py-2">
          <SidebarTrigger />

        </div>
        {children}
      </main>
      <PusherNotify />
    </SidebarProvider>
  );
}
