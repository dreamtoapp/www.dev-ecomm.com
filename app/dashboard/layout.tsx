import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from '@/app/dashboard/components/AppSidebar';

import CurrentLinkTitle from './orders/component/CurrentLinkTitle';
import PusherNotify from './orders/component/pusherNotifaction/PusherNotify';

export default async function Layout({ children }: { children: React.ReactNode }) {
  // This layout is used for the dashboard pages
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== 'admin') {
    return redirect('/auth/login');
  }
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  // Hardcode RTL for now; in the future, detect from language/i18n
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-background w-full" dir="rtl">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Sticky header */}
          <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-3 bg-secondary border-b">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden block" />
              <CurrentLinkTitle />
            </div>
            <PusherNotify />
          </header>
          {/* Main content */}
          <main className="flex-1 w-full p-6 bg-background overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
