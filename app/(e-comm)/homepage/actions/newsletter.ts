"use server";

import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string;

  // Validate email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "يرجى إدخال بريد إلكتروني صحيح." };
  }

  try {
    // Check if email already exists
    const existingEmail = await db.newLetter.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return { error: "هذا البريد الإلكتروني مسجل بالفعل." };
    }

    // Save email to the database
    await db.newLetter.create({
      data: { email },
    });

    revalidatePath("/"); // Revalidate the page if needed
    return { message: "تم التسجيل بنجاح!" };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return { error: "حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى." };
  }
}
