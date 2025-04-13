// app/dashboard/shifts/actions/actions.ts
"use server";
import db from "../../../../lib/prisma";
import { Shift } from "../helper/types";

// Fetch all shifts
export async function fetchShifts(): Promise<Shift[]> {
  try {
    const shifts = await db.shift.findMany();
    return shifts;
  } catch (error) {
    console.error("Error fetching shifts:", error);
    throw new Error("Failed to fetch shifts.");
  }
}

// Create a new shift
export async function createShift(data: Partial<Shift>): Promise<Shift> {
  try {
    const shift = await db.shift.create({
      data: {
        name: data.name!,
        startTime: data.startTime!,
        endTime: data.endTime!,
      },
    });
    return shift;
  } catch (error) {
    console.error("Error creating shift:", error);
    throw new Error("Failed to create shift.");
  }
}

// Delete a shift
export async function deleteShift(id: string): Promise<void> {
  try {
    await db.shift.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting shift:", error);
    throw new Error("Failed to delete shift.");
  }
}
