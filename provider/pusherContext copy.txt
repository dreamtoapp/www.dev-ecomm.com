"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Notification } from "@/types/notification";
import Pusher from "pusher-js";
import { toast } from "sonner";

type ContextType = {
  notifications: Notification[];
  markAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  unreadCount: number;
};

const NotificationsContext = createContext<ContextType>({
  notifications: [],
  markAsRead: () => {},
  removeNotification: () => {},
  clearAllNotifications: () => {},
  unreadCount: 0,
});

export function NotificationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // تحميل الإشعارات من localStorage
  useEffect(() => {
    const saved = localStorage.getItem("notifications");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setNotifications(parsed);
      } catch (error) {
        console.error("خطأ في تحميل الإشعارات:", error);
      }
    }
  }, []);

  // حفظ الإشعارات في localStorage
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  // استقبال إشعارات Pusher وعرض Sonner مع صوت
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe("admin-notifications");

    channel.bind("new-notification", (newNotification: Notification) => {
      setNotifications((prev) => [newNotification, ...prev]);

      // تشغيل صوت الإشعار الافتراضي
      const notificationSound = new Audio(
        "https://www.soundjay.com/buttons/beep-01a.mp3" // رابط صوت افتراضي (يمكنك استبداله بملف محلي)
      );
      notificationSound.play().catch((error) => {
        console.error("خطأ في تشغيل الصوت:", error);
      });

      // عرض إشعار Sonner
      toast[newNotification.type === "message" ? "info" : "success"](
        newNotification.title,
        {
          description: newNotification.content,
          action: {
            label: "تم",
            onClick: () => markAsRead(newNotification.id),
          },
        }
      );
    });

    return () => {
      pusher.unsubscribe("admin-notifications");
    };
  }, []);

  // بقية الدوال بدون تغيير
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        markAsRead,
        removeNotification,
        clearAllNotifications,
        unreadCount,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationsContext);
