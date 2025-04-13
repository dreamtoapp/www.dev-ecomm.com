"use server";

import db from "../../../../lib/prisma";
import { User } from "@prisma/client"; // Import the User type

// Check if the user exists in the database
export async function checkUser(phone: string): Promise<{ user: any } | null> {
  const user = await db.user.findUnique({
    where: { phone },
  });

  // If the user exists, mark their OTP as verified and return the user data
  if (user) {
    await db.user.update({
      where: { phone },
      data: { isOtp: true }, // Mark OTP as verified
    });
    return { user }; // Return the user data
  }

  return null; // User does not exist
}

// Send OTP (mock implementation)
export async function sendOtp(phone: string): Promise<{ success: boolean }> {
  // Replace this with your actual OTP sending logic
  console.log(`OTP sent to ${phone}`);
  return { success: true };
}
