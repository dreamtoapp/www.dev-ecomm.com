// components/SupportPingButton.tsx
// UI Button to ping admin with fallback logic, message modal, and cooldown timer
"use client";
import { useState, useRef, useEffect } from "react";
import { pingAdminAction } from "@/app/pingAdminAction";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const COOLDOWN_SECONDS = 180; // 3 minutes
const LAST_PING_KEY = "support_ping_last_time";

interface SupportPingButtonProps {
  userId: string;
}

/**
 * Button that triggers a support alert to the admin dashboard.
 * Uses a server action for real-time (Pusher) or fallback (DB) notification.
 */
export function SupportPingButton({ userId }: SupportPingButtonProps) {
  const [status, setStatus] = useState<"idle"|"sent"|"error"|"fallback"|"rate-limited">("idle");
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // On mount, restore cooldown from localStorage
  useEffect(() => {
    const lastPing = localStorage.getItem(LAST_PING_KEY);
    if (lastPing) {
      const elapsed = Math.floor((Date.now() - parseInt(lastPing, 10)) / 1000);
      if (elapsed < COOLDOWN_SECONDS) {
        setCooldown(COOLDOWN_SECONDS - elapsed);
      }
    }
  }, []);

  useEffect(() => {
    if (cooldown > 0) {
      timerRef.current = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current!);
    }
  }, [cooldown]);

  // Handles the button click to ping admin
  const handlePing = async () => {
    setLoading(true);
    const res = await pingAdminAction(userId, message);
    setLoading(false);
    if (res.success) {
      setStatus("sent");
      setCooldown(COOLDOWN_SECONDS);
      localStorage.setItem(LAST_PING_KEY, Date.now().toString());
    } else if (res.fallback) {
      setStatus("fallback");
      setCooldown(COOLDOWN_SECONDS);
      localStorage.setItem(LAST_PING_KEY, Date.now().toString());
    } else if (res.rateLimited) {
      setStatus("rate-limited");
      setCooldown(COOLDOWN_SECONDS);
      localStorage.setItem(LAST_PING_KEY, Date.now().toString());
    } else setStatus("error");
    setShowModal(false);
    setMessage("");
  };

  return (
    <div>
      <Button
        variant="secondary"
        size="icon"
        className="support-ping-btn w-14 h-14 rounded-full shadow-lg hover:scale-110 focus:scale-110 focus-visible:ring-4 focus-visible:ring-yellow-200/70 focus:outline-none transition-all duration-200 relative group"
        onClick={() => setShowModal(true)}
        disabled={cooldown > 0}
        title="طلب دعم فوري من الإدارة"
        aria-label="زر طلب دعم فوري من الإدارة"
        tabIndex={0}
      >
        <span className="sr-only">طلب دعم فوري</span>
        <Zap className="w-8 h-8 text-yellow-500 drop-shadow animate-pulse group-hover:animate-bounce" aria-hidden="true" />
        {cooldown > 0 && (
          <span className="absolute -top-2 -right-2 bg-gray-200 text-blue-700 px-2 py-0.5 rounded-full text-xs shadow font-bold animate-pulse" aria-live="polite">
            {Math.floor(cooldown/60)}:{(cooldown%60).toString().padStart(2,"0")}
          </span>
        )}
      </Button>
      {status === "sent" && <span className="ml-2 text-green-600">Alert sent!</span>}
      {status === "fallback" && <span className="ml-2 text-yellow-600">Admin will see your request soon (fallback mode).</span>}
      {status === "rate-limited" && <span className="ml-2 text-orange-600">Please wait before sending another ping.</span>}
      {status === "error" && <span className="ml-2 text-red-600">Failed to send alert. Try again.</span>}
      {/* Modal for entering message */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs flex flex-col gap-3">
            <h3 className="text-lg font-semibold">وصف مشكلتك</h3>
            <p className="text-xs text-gray-700 mb-1">
              <span className="block mb-0.5">الغرض من هذه الخدمة: إرسال طلب دعم فوري للإدارة لحل مشكلة عاجلة أو استفسار هام.</span>
              <span className="block">عدد الأحرف المسموح: من 5 إلى 200 حرف.</span>
              <span className="block">يرجى استخدام هذه الخدمة فقط للمشاكل العاجلة أو الاستفسارات الهامة.</span>
            </p>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              maxLength={200}
              rows={3}
              className="border rounded p-2 w-full resize-none"
              placeholder="كيف يمكننا مساعدتك؟"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowModal(false)}
                disabled={loading}
              >إلغاء</button>
              <button
                className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                onClick={handlePing}
                disabled={loading || message.trim().length < 5}
              >{loading ? "جارٍ الإرسال..." : "إرسال"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
