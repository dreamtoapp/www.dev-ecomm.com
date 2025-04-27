// NotificationList.tsx
// Notification dialog for admin dashboard

import React from "react";
import { Bell, Mail, Newspaper, Package } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../../components/ui/dialog";

export type NotificationType = {
  id: string;
  message: string;
  type?: string;
  userId?: string;
  createdAt: Date;
  read?: boolean;
  link?: string;
};

interface NotificationListProps {
  notifications: NotificationType[];
  onMarkRead: (id: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

const iconMap = {
  support: <Bell className="w-5 h-5 text-blue-400" />,
  order: <Package className="w-5 h-5 text-green-500" />,
  contact: <Mail className="w-5 h-5 text-blue-500" />,
  news: <Newspaper className="w-5 h-5 text-yellow-500" />,
  default: <Bell className="w-5 h-5 text-gray-500" />,
};

const NotificationList: React.FC<NotificationListProps> = ({ notifications, onMarkRead, onClose, isOpen }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-center">الإشعارات</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto overflow-x-hidden divide-y">
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-gray-400 text-base whitespace-nowrap">
              لا توجد إشعارات جديدة
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition hover:bg-gray-50 ${notif.read ? 'opacity-60' : 'bg-yellow-50'}`}
                onClick={() => onMarkRead(notif.id)}
              >
                <div className="pt-1">{iconMap[notif.type as keyof typeof iconMap] || iconMap.default}</div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 text-sm">{notif.message}</div>
                  {notif.userId && <div className="text-xs text-gray-500">User: {notif.userId}</div>}
                  <div className="text-xs text-gray-400 mt-1">{notif.createdAt.toLocaleString('ar-EG')}</div>
                </div>
                {!notif.read && <span className="w-2 h-2 rounded-full bg-red-500 mt-2"></span>}
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationList;
