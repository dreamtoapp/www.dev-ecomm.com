"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  addChangelog,
  getChangelogs,
  updateChangelog,
  deleteChangelog,
} from "../actions/changelog";

// Define the type for a changelog entry
interface Changelog {
  id: string;
  subject: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export default function AddChangelogPage() {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState(getCurrentDateTime());
  const [changelogs, setChangelogs] = useState<Changelog[]>([]);
  const [editChangelog, setEditChangelog] = useState<Changelog | null>(null);

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

  async function handleAddChangelog(e: React.FormEvent) {
    e.preventDefault();
    try {
      await addChangelog(subject, new Date(date));
      alert("Changelog added successfully!");
      await fetchChangelogs();
      setSubject("");
      setDate(getCurrentDateTime());
    } catch (error) {
      alert("Failed to add changelog");
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this changelog?")) {
      try {
        await deleteChangelog(id);
        alert("Changelog deleted!");
        await fetchChangelogs();
      } catch (error) {
        alert("Failed to delete changelog");
      }
    }
  }

  async function handleEditSubmit(updatedSubject: string) {
    if (!editChangelog) return;
    try {
      await updateChangelog(editChangelog.id, updatedSubject);
      alert("Changelog updated!");
      setEditChangelog(null);
      await fetchChangelogs();
    } catch (error) {
      alert("Failed to update changelog");
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Add Changelog</h1>

      {/* Changelog Form */}
      <form
        onSubmit={handleAddChangelog}
        className="space-y-4 mb-6 bg-white p-4 rounded-lg shadow-sm"
      >
        <FormInput
          label="Subject"
          id="subject"
          value={subject}
          onChange={setSubject}
        />
        <FormDateTime
          label="Date and Time"
          id="date"
          value={date}
          onChange={setDate}
        />
        <div className="flex gap-3 justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 text-sm"
          >
            Add Changelog
          </button>
          <button
            type="button"
            onClick={() => router.push("/khalidnadish")}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200 text-sm"
          >
            Take Me to Home
          </button>
        </div>
      </form>

      {/* Changelog Table */}
      <h2 className="text-2xl font-bold mb-4 text-center">Changelogs</h2>
      <ChangelogTable
        changelogs={changelogs}
        onEdit={setEditChangelog}
        onDelete={handleDelete}
      />

      {/* Edit Modal */}
      {editChangelog && (
        <EditModal
          changelog={editChangelog}
          onSave={handleEditSubmit}
          onClose={() => setEditChangelog(null)}
        />
      )}
    </div>
  );
}

/* ====================== 🔹 REUSABLE COMPONENTS 🔹 ====================== */

// Changelog Table Component with Edit & Delete
function ChangelogTable({
  changelogs,
  onEdit,
  onDelete,
}: {
  changelogs: Changelog[];
  onEdit: (log: Changelog) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <TableHeader title="Subject" />
            <TableHeader title="Date" />
            <TableHeader title="Time" />
            <TableHeader title="Actions" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {changelogs.map((log) => {
            const { date, time } = formatDateTime(log.createdAt);
            return (
              <tr
                key={log.id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="py-3 px-4 text-sm text-gray-900">
                  {log.subject}
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">{date}</td>
                <td className="py-3 px-4 text-sm text-gray-900">{time}</td>
                <td className="py-3 px-4 text-sm text-gray-900 space-x-2">
                  <button
                    onClick={() => onEdit(log)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(log.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// Edit Modal Component
function EditModal({
  changelog,
  onSave,
  onClose,
}: {
  changelog: Changelog;
  onSave: (subject: string) => void;
  onClose: () => void;
}) {
  const [newSubject, setNewSubject] = useState(changelog.subject);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Edit Changelog</h2>
        <input
          type="text"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={() => onSave(newSubject)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded"
          >
            Cancel
          </button>
        </div>
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

// Helper to get the current date and time in ISO format
function getCurrentDateTime(): string {
  return new Date().toISOString().slice(0, 16);
}

// Reusable Table Header Component
function TableHeader({ title }: { title: string }) {
  return (
    <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
      {title}
    </th>
  );
}

// Reusable Input Component
function FormInput({
  label,
  id,
  value,
  onChange,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        required
      />
    </div>
  );
}

// Reusable DateTime Input Component
function FormDateTime({
  label,
  id,
  value,
  onChange,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type="datetime-local"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>
  );
}
