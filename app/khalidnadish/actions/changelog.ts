"use server";

import db from "../../../lib/prisma";

// 🔹 Fetch all changelog entries (sorted by latest)
export async function getChangelogs() {
  try {
    const logs = await db.changelog.findMany({
      orderBy: {
        createdAt: "desc", // Sort by latest first
      },
    });
    return logs;
  } catch (error) {
    console.error("Error fetching changelogs:", error);
    throw new Error("Failed to fetch changelogs");
  }
}

// 🔹 Add a new changelog entry
export async function addChangelog(subject: string, createdAt: Date) {
  try {
    const newLog = await db.changelog.create({
      data: {
        subject,
        createdAt, // Use the custom date provided by the user
      },
    });
    return newLog;
  } catch (error) {
    console.error("Error adding changelog:", error);
    throw new Error("Failed to add changelog");
  }
}

// 🔹 Update an existing changelog
export async function updateChangelog(id: string, subject: string) {
  try {
    const updatedLog = await db.changelog.update({
      where: { id },
      data: { subject },
    });
    return updatedLog;
  } catch (error) {
    console.error(`Error updating changelog with ID ${id}:`, error);
    throw new Error("Failed to update changelog");
  }
}

// 🔹 Delete a changelog by ID
export async function deleteChangelog(id: string) {
  try {
    await db.changelog.delete({
      where: { id },
    });
    return { message: "Changelog deleted successfully" };
  } catch (error) {
    console.error(`Error deleting changelog with ID ${id}:`, error);
    throw new Error("Failed to delete changelog");
  }
}
