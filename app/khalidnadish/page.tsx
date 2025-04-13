"use client";
import { useState, useEffect } from "react";
import { getChangelogs } from "./actions/changelog";

// Define the type for a changelog entry
interface Changelog {
  id: string;
  subject: string;
  updatedAt: Date | string;
}

export default function AddChangelogPage() {
  const [changelogs, setChangelogs] = useState<Changelog[]>([]);

  // Fetch changelogs on component mount
  useEffect(() => {
    fetchChangelogs();
  }, []);

  async function fetchChangelogs() {
    try {
      const logs = await getChangelogs();
      setChangelogs(logs);
    } catch (error) {
      console.error("Failed to fetch changelogs:", error);
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">سجل التحديثات</h1>

      {/* Changelog Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <TableHeader title="التحديث" />
              <TableHeader title="التاريخ" />
              <TableHeader title="الوقت" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {changelogs.map((log) => {
              const { date, time } = formatDateTime(log.updatedAt); // Split date and time
              return (
                // Ensure no extra whitespace or text nodes inside <tr>
                <tr
                  key={log.id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {log.subject}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{date}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ====================== 🔹 HELPER FUNCTIONS 🔹 ====================== */

// Helper to format UTC date into local date and time
function formatDateTime(
  utcDate: Date | string,
  timeZone: string = "Asia/Riyadh"
) {
  const dateObj = new Date(utcDate);
  return {
    date: dateObj.toLocaleDateString("en-US", { timeZone }),
    time: dateObj.toLocaleTimeString("en-US", { timeZone }),
  };
}

// Reusable Table Header Component
function TableHeader({ title }: { title: string }) {
  return (
    <th className="py-3 px-4   text-xs font-medium text-gray-700 uppercase tracking-wider text-right">
      {title}
    </th>
  );
}
