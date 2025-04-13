"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import db from "../../../../lib/prisma";
import { Subscriber } from "../../../../types/newsletters";

// Fetch all subscribers
export async function fetchSubscribers(): Promise<Subscriber[]> {
  return await db.newLetter.findMany({
    orderBy: { createdAt: "desc" },
  });
}

// Delete a subscriber
export async function deleteSubscriber(
  id: string
): Promise<{ success?: string; error?: string }> {
  try {
    await db.newLetter.delete({
      where: { id },
    });
    revalidatePath("/dashboard"); // Revalidate the page to reflect changes
    return { success: "Subscriber deleted successfully" };
  } catch (error) {
    return { error: "Failed to delete subscriber" };
  }
}
