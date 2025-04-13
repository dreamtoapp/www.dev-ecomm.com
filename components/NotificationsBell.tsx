"use client";
import {
  useEffect,
  useState,
} from 'react'

import {
  BellIcon,
  CheckCircle2,
  Clock,
  Mail,
  ShoppingCart,
  Trash2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useNotifications } from '@/provider/pusherContext'

export default function NotificationsDialog() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    removeNotification,
    clearAllNotifications,
  } = useNotifications();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getIcon = (type: string) => {
    const iconClass = "h-5 w-5";
    return {
      message: <Mail className={iconClass} />,
      order: <ShoppingCart className={iconClass} />,
    }[type];
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative cursor-pointer">
          <div className="p-2 rounded-full hover:bg-accent transition-colors">
            <BellIcon className="h-6 w-6 text-muted-foreground hover:text-foreground" />
            {unreadCount > 0 && (
              <div className="absolute top-0 right-0 bg-primary text-white rounded-full text-xs h-5 w-5 flex items-center justify-center shadow-sm">
                {unreadCount}
              </div>
            )}
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-md rounded-lg p-0 overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center bg-muted/10">
          <div className="flex items-center gap-3">
            <DialogTitle className="text-lg font-semibold">الإشعارات</DialogTitle>
            {unreadCount > 0 && (
              <span className="text-sm text-primary bg-primary/10 px-2 py-1 rounded-full">
                {unreadCount} جديد
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllNotifications}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            مسح الكل
          </Button>
        </div>

        <ScrollArea className="h-[400px]">
          <div className="divide-y">
            {!isMounted ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-4 space-y-2">
                  <Skeleton className="h-4 w-[80%]" />
                  <Skeleton className="h-3 w-[60%]" />
                </div>
              ))
            ) : notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "group flex items-start gap-4 p-4 relative",
                    "hover:bg-muted/10 transition-colors",
                    !notification.read && "bg-background"
                  )}
                >
                  <div className="shrink-0 mt-1 text-primary">
                    {getIcon(notification.type)}
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <h4 className={cn(
                          "font-medium",
                          !notification.read && "text-foreground"
                        )}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <span className="h-2 w-2 bg-primary rounded-full" />
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notification.id);
                        }}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {notification.content}
                    </p>

                    {notification.type === "order" && (
                      <div className="flex gap-2 mt-2">
                        <div className="flex items-center gap-1 text-xs px-2 py-1 bg-muted rounded-full">
                          <ShoppingCart className="h-3 w-3" />

                          <span>{notification.metadata?.itemsCount} عنصر</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>{notification.metadata?.totalAmount} ر.س</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                      <Clock className="h-3 w-3" />
                      <span>منذ 2 ساعة</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center p-6 text-center space-y-3">
                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center">
                  <BellIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h4 className="font-medium">لا توجد إشعارات</h4>
                <p className="text-sm text-muted-foreground">
                  سيظهر هنا أي إشعارات جديدة تتلقاها
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}