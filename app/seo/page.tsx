import type { Metadata } from 'next';

import { getAllSeoEntries } from '@/app/seo/actions/seo';
import SeoTable from '@/app/seo/components/seo-table';
import Link from '@/components/link';

export const metadata: Metadata = {
  title: "SEO Management",
  description: "Manage your SEO settings across your website",
};

export default async function SeoPage() {
  const seoEntries = await getAllSeoEntries();

  return (
    <div className="container mx-auto py-10 px-4 text-black">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">SEO Management</h1>
          <p className="text-gray-500 mt-1">
            Manage your SEO settings across your website
          </p>
        </div>
        <Link
          href="/seo/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Create New Entry
        </Link>
      </div>

      <SeoTable initialData={seoEntries} />
    </div>
  );
}
