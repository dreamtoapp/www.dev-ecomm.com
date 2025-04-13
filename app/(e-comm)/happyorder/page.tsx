"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, MessageSquareText } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Confetti from "react-confetti"; // Import Confetti
import useWindowSize from "react-use/lib/useWindowSize"; // For responsive confetti

// Semantic Colors
const SEMANTIC_COLORS = {
  success: {
    border: "border-green-500",
    bg: "bg-background",
    text: "text-green-700",
  },
  warning: {
    border: "border-yellow-500",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
  },
  error: { border: "border-red-500", bg: "bg-red-50", text: "text-red-700" },
  info: {
    border: "border-blue-500",
    bg: "bg-background",
    text: "text-blue-700",
  },
  default: {
    border: "border-gray-300",
    bg: "bg-blue-600",
    text: "text-white",
  },
};

const WHATSAPP_NUMBER = "1234567890"; // Replace with your WhatsApp number
const WHATSAPP_MESSAGE = "مرحبًا! أريد متابعة حالة طلبي برقم الطلب:";

export default function OrderConfirmation() {
  const router = useRouter();
  const { clearCart } = useCartStore();
  const [showClearCartDialog, setShowClearCartDialog] = useState(true);
  const [isClient, setIsClient] = useState(false); // State to track client-side rendering
  const { width, height } = useWindowSize(); // Get window size for responsive confetti

  // Use useSearchParams to get query parameters
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderid");

  useEffect(() => {
    if (!orderId) {
      router.push("/");
    }
    setIsClient(true); // Mark as client-side after component mounts
  }, [orderId, router]);

  const handleClearCart = () => {
    clearCart();
    setShowClearCartDialog(false);
    router.push("/");
  };

  const handleKeepCart = () => {
    setShowClearCartDialog(false);
    router.push("/");
  };

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `${WHATSAPP_MESSAGE} ${orderId}`
  )}`;

  if (!orderId) return null;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      dir="rtl" // Add RTL support
    >
      {/* Add Confetti */}
      {isClient && (
        <Confetti
          width={width}
          height={height}
          recycle={false} // Stop confetti after one cycle
        />
      )}

      <Card
        className={`w-full max-w-md ${SEMANTIC_COLORS.success.border} ${SEMANTIC_COLORS.success.bg}`}
      >
        <CardHeader className="text-center">
          <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
          <CardTitle className="text-2xl">تم تأكيد الطلب!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert
            className={`bg-blue-50 border-blue-200 ${SEMANTIC_COLORS.info.border} ${SEMANTIC_COLORS.info.bg}`}
          >
            <AlertTitle className="text-lg font-semibold">
              رقم الطلب: #{orderId}
            </AlertTitle>
            <AlertDescription>لقد تلقينا طلبك بنجاح.</AlertDescription>
          </Alert>
          <div className="text-center">
            <Button asChild variant="outline" className="w-full">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageSquareText className="h-4 w-4" />
                تتبع الطلب عبر واتساب
              </a>
            </Button>
          </div>
          {showClearCartDialog && (
            <div
              className={`mt-6 p-4 rounded-lg ${SEMANTIC_COLORS.default.border} ${SEMANTIC_COLORS.default.bg}`}
            >
              <h3 className="text-lg font-medium mb-2">إفراغ سلة التسوق؟</h3>
              <p className="text-sm text-gray-100 mb-4">
                هل ترغب في إفراغ السلة لشراء منتجات جديدة؟
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={handleClearCart}
                  className="flex-1 bg-red-500 hover:bg-red-600"
                >
                  نعم، إفراغ السلة
                </Button>
                <Button
                  onClick={handleKeepCart}
                  variant="outline"
                  className="flex-1"
                >
                  الاحتفاظ بالعناصر
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center mt-4">
          <Button
            variant="link"
            onClick={() => router.push("/")}
            className="text-gray-600"
          >
            متابعة التسوق →
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
