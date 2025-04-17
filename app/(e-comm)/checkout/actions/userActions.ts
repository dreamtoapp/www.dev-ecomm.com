"use server";
import { revalidatePath } from "next/cache";
import db from "../../../../lib/prisma";

const otpStore = new Map<string, { otp: string; expires: number }>();

export async function checkUserExists(phone: string) {
  try {
    const user = await db.user.findUnique({ where: { phone } });
    return { exists: !!user, data: user };
  } catch (error) {
    console.error("[CHECK_USER_ERROR]", error);
    return { exists: false, data: null };
  }
}
interface User {
  id: string;
  phone: string;
  name: string;
  address: string;
  lat: string;
  lng: string;
}

export async function createUser(
  phone: string,
  name: string,
  address: string,
  lat: string,
  lng: string
): Promise<User> {
  try {
    let user = await db.user.findUnique({ where: { phone } });
    user = await db.user.create({
      data: { phone, name, address, latitude: lat, longitude: lng },
    });

    // OTP logic (if needed)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(phone, { otp, expires: Date.now() + 600000 });
    console.log(`[OTP] Generated for ${phone}: ${otp}`);

    // Return the user object
    return {
      id: user.id,
      phone: user.phone ?? "",
      name: user.name ?? "",
      address: user.address as string,
      lat: user.latitude,
      lng: user.longitude,
    };
  } catch (error) {
    console.error("[CREATE_USER_ERROR]", error);
    throw new Error("فشل في إنشاء الحساب");
  }
}

export async function verifyOtp(phone: string, otpInput: string) {
  try {
    const stored = otpStore.get(phone);

    if (!stored || stored.otp !== otpInput || Date.now() > stored.expires) {
      return { success: false, error: "كود غير صحيح أو منتهي" };
    }

    await db.user.update({ where: { phone }, data: { isOtp: true } });
    otpStore.delete(phone);
    return { success: true };
  } catch (error) {
    console.error("[VERIFY_OTP_ERROR]", error);
    return { success: false, error: "فشل التحقق" };
  }
}
