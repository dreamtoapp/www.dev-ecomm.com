// Dashboard Alerts Page with Filters and Mark All as Read
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getAllNotifications, markAllNotificationsRead } from '@/lib/notifications';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Mail, Package, Newspaper } from 'lucide-react';
import React from 'react';

export default async function AlertsPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');
  const { type } = await searchParams;

  // Fetch all notifications for the user (optionally filtered)
  const notifications = await getAllNotifications({
    userId: session.user.id,
    type: type || undefined,
  });
  const unreadCount = notifications.filter(n => n.status === 'unread').length;
  const hasUnread = unreadCount > 0;

  // List of unique types for filter
  const types = Array.from(new Set(notifications.map(n => n.type).filter(Boolean)));

  // Mark all as read (server action)
  async function handleMarkAllRead() {
    'use server';
    await markAllNotificationsRead({ userId: session?.user?.id || '', type: type || undefined });
    redirect('/dashboard/alerts');
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">كل الإشعارات</h1>
        {hasUnread && (
          <form action={handleMarkAllRead}>
            <Button type="submit" variant="secondary" size="sm">
              تعليم الكل كمقروءة
            </Button>
          </form>
        )}
      </div>
      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <a href="/dashboard/alerts" className={`px-3 py-1 rounded ${!type ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}>الكل</a>
        {types.map(type => (
          <a
            key={type}
            href={`/dashboard/alerts?type=${type}`}
            className={`px-3 py-1 rounded ${type === type ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            {type === 'order' && 'الطلبات'}
            {type === 'support' && 'الدعم'}
            {type === 'contact' && 'اتصل بنا'}
            {type === 'news' && 'الأخبار'}
            {!['order', 'support', 'contact', 'news'].includes(type) && type}
          </a>
        ))}
      </div>
      {notifications.length === 0 ? (
        <div className="text-center text-gray-400 py-12">لا توجد إشعارات بعد</div>
      ) : (
        notifications.map((notif) => (
          <Card key={notif.id} className={`flex items-center gap-4 ${notif.status === 'unread' ? '' : 'opacity-60'}`}>
            <CardContent className="flex items-center gap-4 w-full">
              {/* Icon by type */}
              {notif.type === 'order' && <Package className="text-green-500" />}
              {notif.type === 'support' && <Bell className="text-blue-400" />}
              {notif.type === 'contact' && <Mail className="text-blue-500" />}
              {notif.type === 'news' && <Newspaper className="text-yellow-500" />}
              <div className="flex-1">
                <div className="font-medium">{notif.message}</div>
                <div className="text-xs text-gray-400">{new Date(notif.createdAt).toLocaleString('ar-EG')}</div>
              </div>
              {notif.status === 'unread' && <Badge variant="destructive">جديد</Badge>}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
