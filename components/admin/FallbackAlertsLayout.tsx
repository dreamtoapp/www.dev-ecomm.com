// components/admin/FallbackAlertsLayout.tsx
// UI layout for displaying recent Pusher fallback alerts to admins
// Follows project coding standards and best UX practices

import React from "react";
import { AlertTriangle, Zap } from "lucide-react";

// Props: Array of fallback alert objects
export type FallbackAlertType = {
  id: string;
  userId: string;
  message: string;
  timestamp: string;
  error?: string;
};

interface FallbackAlertsLayoutProps {
  alerts: FallbackAlertType[];
}

const FallbackAlertsLayout: React.FC<FallbackAlertsLayoutProps> = ({ alerts }) => {
  return (
    <section className="w-full max-w-2xl mx-auto p-4">
      <h2 className="flex items-center gap-2 text-xl font-bold text-yellow-700 mb-4">
        <AlertTriangle className="w-6 h-6 text-yellow-500 animate-pulse" />
        تنبيهات فشل إرسال الدعم الفوري (Fallback Alerts)
      </h2>
      {alerts.length === 0 ? (
        <div className="text-gray-400 text-center py-8">لا توجد تنبيهات فشل حالياً</div>
      ) : (
        <ul className="space-y-4">
          {alerts.map(alert => (
            <li key={alert.id} className="bg-yellow-50 border-l-4 border-yellow-400 rounded-md shadow p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
                <span className="font-semibold text-yellow-800">User: {alert.userId}</span>
                <span className="text-xs text-gray-500 ml-auto">{new Date(alert.timestamp).toLocaleString('ar-EG')}</span>
              </div>
              <div className="text-gray-800 mt-1">{alert.message}</div>
              {alert.error && (
                <div className="text-xs text-red-500 mt-1">خطأ: {alert.error}</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default FallbackAlertsLayout;
