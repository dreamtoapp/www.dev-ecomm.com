import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getSeoEntryById } from '@/app/seo/actions/seo';
import Link from '@/components/link';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const seo = await getSeoEntryById(id);

  if (!seo) {
    return {
      title: "SEO Entry Not Found",
    };
  }

  return {
    title: `SEO Entry: ${seo.metaTitle || seo.entityId}`,
    description: seo.metaDescription,
  };
}

export default async function SeoDetailPage({ params }: Props) {
  const { id } = await params;
  const seo = await getSeoEntryById(id);

  if (!seo) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Link href="/seo" className="text-blue-600 hover:text-blue-800 mr-2">
            ← Back to SEO Entries
          </Link>
        </div>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">
              {seo.metaTitle || "Untitled SEO Entry"}
            </h1>
            <p className="text-gray-500 mt-1">Entity ID: {seo.entityId}</p>
          </div>
          <div className="flex space-x-2">
            <Link
              href={`/seo/${seo.id}/edit`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Basic SEO</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Industry Type
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {seo.industryType}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Meta Title
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {seo.metaTitle}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Meta Description
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {seo.metaDescription}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Canonical URL
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {seo.canonicalUrl || "Not set"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Robots</dt>
                  <dd className="mt-1 text-sm text-gray-900">{seo.robots}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Keywords
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {seo.keywords.length > 0
                      ? seo.keywords.join(", ")
                      : "No keywords set"}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Social Media</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Open Graph Title
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {seo.socialMedia.openGraphTitle || "Not set"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Open Graph Images
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {seo.socialMedia.openGraphImages ? (
                      <pre className="bg-gray-100 p-2 rounded-md overflow-auto max-h-40">
                        {JSON.stringify(
                          seo.socialMedia.openGraphImages,
                          null,
                          2
                        )}
                      </pre>
                    ) : (
                      "Not set"
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Twitter Card Type
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {seo.socialMedia.twitterCardType || "Not set"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Twitter Images
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {seo.socialMedia.twitterImages ? (
                      <pre className="bg-gray-100 p-2 rounded-md overflow-auto max-h-40">
                        {JSON.stringify(seo.socialMedia.twitterImages, null, 2)}
                      </pre>
                    ) : (
                      "Not set"
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Technical SEO</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Security Headers
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {seo.technicalSEO.securityHeaders.length > 0
                      ? seo.technicalSEO.securityHeaders.join(", ")
                      : "No security headers set"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Preload Assets
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {seo.technicalSEO.preloadAssets.length > 0
                      ? seo.technicalSEO.preloadAssets.join(", ")
                      : "No preload assets set"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    HTTP Equiv
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {seo.technicalSEO.httpEquiv.length > 0
                      ? seo.technicalSEO.httpEquiv.join(", ")
                      : "No HTTP equiv set"}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Localization</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Default Language
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {seo.localization.defaultLanguage}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Supported Languages
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {seo.localization.supportedLanguages.length > 0
                      ? seo.localization.supportedLanguages.join(", ")
                      : "No supported languages set"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Hreflang
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {seo.localization.hreflang ? (
                      <pre className="bg-gray-100 p-2 rounded-md overflow-auto max-h-40">
                        {JSON.stringify(seo.localization.hreflang, null, 2)}
                      </pre>
                    ) : (
                      "Not set"
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Advanced</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Schema.org (JSON-LD)
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {seo.schemaOrg ? (
                    <pre className="bg-gray-100 p-2 rounded-md overflow-auto max-h-60">
                      {JSON.stringify(seo.schemaOrg, null, 2)}
                    </pre>
                  ) : (
                    "Not set"
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Industry-Specific Data
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {seo.industryData ? (
                    <pre className="bg-gray-100 p-2 rounded-md overflow-auto max-h-60">
                      {JSON.stringify(seo.industryData, null, 2)}
                    </pre>
                  ) : (
                    "Not set"
                  )}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 pt-6 border-t">
            <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Created At
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(seo.createdAt).toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Updated At
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(seo.updatedAt).toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">ID</dt>
                <dd className="mt-1 text-sm text-gray-900">{seo.id}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
