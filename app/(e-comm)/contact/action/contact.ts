"use server";
import { revalidatePath } from "next/cache";
import db from "@/lib/prisma";
import { pusher } from "@/lib/pusher";
import { Notification } from "@/types/notification";

export type SubmitFormState = {
  success: boolean;
  message: string;
};

export async function submitContactForm(
  prevState: SubmitFormState,
  formData: FormData
): Promise<SubmitFormState> {
  try {
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const subject = formData.get("subject")?.toString() || "";
    const message = formData.get("message")?.toString() || "";

    if (!name || !email || !subject || !message) {
      return {
        success: false,
        message: "جميع الحقول مطلوبة",
      };
    }

    const submission = await db.contactSubmission.create({
      data: { name, email, subject, message },
    });

    const notification: Notification = {
      id: submission.id,
      type: "message",
      title: `رسالة جديدة من ${name}`,
      content: subject,
      read: false,
      metadata: {
        email,
        fullMessage: message,
      },
    };

    await pusher.trigger(
      "admin-notifications",
      "new-notification",
      notification
    );

    revalidatePath("/dashboard/contact");

    return {
      success: true,
      message: "تم إرسال الرسالة بنجاح ✅",
    };
  } catch (error) {
    console.error("Submission error:", error);
    return {
      success: false,
      message: "حدث خطأ أثناء الإرسال ⚠️",
    };
  }
}
