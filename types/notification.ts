// types/notification.ts
export type NotificationType = "message" | "order";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  content: string;
  read: boolean;
  metadata?: {
    [key: string]: any;
  };
}
