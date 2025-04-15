"use client";
import React, {
  useEffect,
  useState,
} from 'react';

import {
  Bell,
  Check,
  CheckCircle,
  MoreVertical,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

import {
  getAllNotifications,
  markAllAsRead,
  markAsRead,
} from './msgCounter';

function NotifyDialog({ counter, isOpen, setIsOpen }: { counter: number; isOpen: boolean; setIsOpen: (open: boolean) => void }) {

  const [notifications, setNotifications] = useState<{ id: string; message: string; status: string }[]>([]);
  const [unreadCount, setUnreadCount] = useState(counter); // Initialize with `counter`
  const [isLoading, setIsLoading] = useState(true);

  // Sync with counter prop changes
  useEffect(() => {
    setUnreadCount(counter);
  }, [counter]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        const { unreadMessages } = await getAllNotifications();
        setNotifications(unreadMessages);
        setUnreadCount(unreadMessages.length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) fetchNotifications();
  }, [isOpen]);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
      setNotifications(prev => prev.filter(n => n.id !== id));
      setUnreadCount(prev => prev - 1);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead();
      setNotifications([]);
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative h-10 w-10 sm:h-11 sm:w-11 rounded-full",
            "bg-background hover:bg-muted",
            "transition-transform hover:scale-105"
          )}
        >
          <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
          {isLoading ? (
            <Skeleton className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full animate-pulse" />
          ) : unreadCount > 0 ? (
            <Badge
              variant="destructive"
              className={cn(
                "absolute -top-1 -right-1",
                "h-4 w-4 sm:h-5 sm:w-5 p-0 rounded-full",
                "flex items-center justify-center",
                unreadCount > 0 ? "animate-ping-once" : ""
              )}
            >
              <span className="text-[10px] sm:text-xs text-white">
                {Math.min(unreadCount, 99)}{unreadCount > 99 && '+'}
              </span>
            </Badge>
          ) : null}
        </Button>
      </DialogTrigger> */}

      <DialogContent className="p-0 max-h-[90dvh] w-full sm:max-w-md overflow-hidden">
        <Card className="border-0 sm:border">
          <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-base sm:text-lg">Notifications</DialogTitle>
              <div className="flex items-center gap-1 sm:gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                    >
                      <MoreVertical className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[160px]">
                    <DropdownMenuItem
                      onClick={handleMarkAllRead}
                      disabled={isLoading || notifications.length === 0}
                      className="text-xs sm:text-sm"
                    >
                      <CheckCircle className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      Mark all read
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                  >
                    <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogHeader>

          <CardContent className="p-0">
            <ScrollArea className="h-[70dvh] sm:h-[60vh]">
              {isLoading ? (
                <div className="space-y-3 px-3 sm:px-4 py-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between px-2 sm:px-3 py-2"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-[70%] rounded-md" />
                      </div>
                      <Skeleton className="h-6 w-6 sm:h-8 sm:w-8 rounded-md" />
                    </div>
                  ))}
                </div>
              ) : notifications.length > 0 ? (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-center justify-between px-3 sm:px-4 py-3 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <Bell className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                        <span className="text-xs sm:text-sm truncate">
                          {notification.message}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-muted-foreground hover:text-primary"
                      >
                        <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-4 sm:p-6 gap-3">
                  <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    No new notifications
                  </p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export default NotifyDialog;