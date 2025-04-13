"use server";
import Pusher from "pusher";
import { revalidatePath } from "next/cache";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

export async function submitForm(formData: {
  name: string;
  email: string;
  subject?: string;
  message: string;
  type: "message" | "order";
}) {
  const newSubmission = {
    id: crypto.randomUUID(),
    type: formData.type, // "message" أو "order"
    name: formData.name,
    email: formData.email,
    subject: formData.subject || "",
    message: formData.message,
    createdAt: new Date().toISOString(),
  };

  // إرسال التحديث عبر Pusher
  await pusher.trigger("dashboard-updates", "new-submission", newSubmission);

  // إعادة تحديث البيانات في لوحة التحكم
  revalidatePath("/dashboard");

  return { success: true };
}
