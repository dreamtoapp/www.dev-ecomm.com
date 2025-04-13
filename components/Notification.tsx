// app/components/Notification.tsx
"use client";
import { motion } from "framer-motion";

type NotificationProps = {
  message: string;
  onClose: () => void;
};

export default function Notification({ message, onClose }: NotificationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg"
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200 transition"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
}
