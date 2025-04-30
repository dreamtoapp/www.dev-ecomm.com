import { Home, LayoutGrid } from "lucide-react";
import Link from "next/link";

export default function SidebarHeader() {
  return (
    <header className="flex flex-col items-center gap-2 py-6 bg-white shadow rounded-b-lg border-b">
      <nav className="flex flex-row-reverse gap-6 items-center">
        <Link href="/dashboard" className="group" aria-label="الرئيسية">
          <Home className="w-7 h-7 text-blue-600 group-hover:text-blue-800 transition" />
        </Link>
        <Link href="/dashboard" className="group" aria-label="التطبيقات">
          <LayoutGrid className="w-7 h-7 text-blue-600 group-hover:text-blue-800 transition" />
        </Link>
      </nav>

    </header>
  );
}
