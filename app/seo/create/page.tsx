import type { Metadata } from 'next';

import SeoForm from '@/app/seo/components/seo-form';
import Link from '@/components/link';

import { generateEntityId } from '../../../utils/seo';

export const metadata: Metadata = {
  title: "Create SEO Entry",
  description: "Create a new SEO entry for your website",
};

export default function CreateSeoPage() {
  // Generate a default entity ID
  const defaultEntityId = generateEntityId();

  return (
    <div className="container mx-auto py-10 px-4 text-black">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Link href="/seo" className="text-blue-600 hover:text-blue-800 mr-2">
            ← Back to SEO Entries
          </Link>
        </div>
        <h1 className="text-3xl font-bold">Create SEO Entry</h1>
        <p className="text-gray-500 mt-1">
          Create a new SEO entry for your website
        </p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <SeoForm
          defaultValues={{
            entityId: "",
            industryType: "WATER",
            metaTitle: "",
            metaDescription: "",
            canonicalUrl: "",
            robots: "index, follow",
            keywords: [],

            // Social Media
            openGraphTitle: "",
            openGraphImages: "",
            twitterCardType: "",
            twitterImages: "",

            // Technical SEO
            securityHeaders: ["X-Content-Type-Options: nosniff"],
            preloadAssets: [],
            httpEquiv: ["content-language: ar-SA"],

            // Localization
            defaultLanguage: "ar-SA",
            supportedLanguages: ["ar-SA"],
            hreflang: "",

            // Advanced
            schemaOrg: "",
            industryData: "",
          }}
          mode="create"
        />
      </div>
    </div>
  );
}
