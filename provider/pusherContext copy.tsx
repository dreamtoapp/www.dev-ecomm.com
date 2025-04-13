"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import Pusher from 'pusher-js'
import { toast } from 'sonner'

// Define the Notification type
type Notification = {
  id: string;
  title: string;
  content: string;
  type: "message" | "order";
  read: boolean;
};

// Context type definition
type ContextType = {
  notifications: Notification[];
  markAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  unreadCount: number;
};

const NotificationsContext = createContext<ContextType>({
  notifications: [],
  markAsRead: () => { },
  removeNotification: () => { },
  clearAllNotifications: () => { },
  unreadCount: 0,
});

export const useNotifications = () => useContext(NotificationsContext);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const userInteractedRef = useRef(false); // Tracks user interaction with the page

  // Load notifications from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("notifications");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setNotifications(parsed);
      } catch (error) {
        console.error("Failed to load notifications:", error);
      }
    }
  }, []);

  // Save notifications to localStorage on state change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Detect first user interaction (click) with the document
  useEffect(() => {
    const handleInteraction = () => {
      userInteractedRef.current = true;
      document.removeEventListener("click", handleInteraction); // Cleanup after first interaction
    };
    document.addEventListener("click", handleInteraction);
    return () => document.removeEventListener("click", handleInteraction);
  }, []);

  // Initialize Pusher and handle real-time notifications
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe("admin-notifications");

    const handleNewNotification = (newNotification: Notification) => {
      setNotifications((prev) => [newNotification, ...prev]);

      // Attempt to play sound only if user has interacted with the page
      if (userInteractedRef.current) {
        const sound = new Audio("/notification.mp3"); // Local sound file
        sound
          .play()
          .catch((error) => {
            console.error("Failed to play sound:", error);
            toast.warning("Enable audio permissions to hear notifications.");
          });
      }

      // Always show visual toast notification
      toast[newNotification.type === "message" ? "info" : "success"](
        newNotification.title,
        {
          description: newNotification.content,
          action: {
            label: "Mark as Read",
            onClick: () => markAsRead(newNotification.id),
          },
        }
      );
    };

    channel.bind("new-notification", handleNewNotification);

    // Cleanup on component unmount
    return () => {
      channel.unbind("new-notification", handleNewNotification);
      pusher.unsubscribe("admin-notifications");
    };
  }, []); // No dependencies - runs once on mount

  // Context methods
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAllNotifications = () => setNotifications([]);

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