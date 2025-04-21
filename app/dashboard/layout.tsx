import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import CurrentLinkTitle from './(dashboard)/component/CurrentLinkTitle';
import DashboardSidebar from './(dashboard)/component/dashboard-sidebar';
import PusherNotify from './(dashboard)/component/pusherNotifaction/PusherNotify';

export default async function Layout({ children }: { children: React.ReactNode }) {
  // This layout is used for the dashboard pages
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== 'admin') {
    return redirect('/auth/login');
  }
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <DashboardSidebar />
      <SidebarInset>
        <main className="px-4 relative">
          <div className="sticky top-0 left-0 z-50 flex items-center justify-between px-4 py-2 bg-secondary rounded-xl mb-4" >
            <div className="flex items-center gap-2 ">
              <SidebarTrigger />
              <CurrentLinkTitle />
            </div>

            <PusherNotify />

          </div>
          <div className='flex min-h-screen w-full flex-col gap-4  overflow-hidden bg-secondary rounded-xl p-4'>
            {children}
          </div>

        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
