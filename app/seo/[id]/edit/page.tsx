import type { Metadata } from "next";
import Link from "@/components/link";
import { notFound } from "next/navigation";
import { getSeoEntryById } from "@/app/seo/actions/seo";
import SeoForm from "@/app/seo/components/seo-form";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const seo = await getSeoEntryById(id);

  if (!seo) {
    return {
      title: "Edit SEO Entry - Not Found",
    };
  }

  return {
    title: `Edit SEO Entry: ${seo.metaTitle || seo.entityId}`,
    description: `Edit SEO settings for ${seo.metaTitle || seo.entityId}`,
  };
}

export default async function EditSeoPage({ params }: Props) {
  const { id } = await params;
  const seo = await getSeoEntryById(id);

  if (!seo) {
    notFound();
  }

  // Prepare form data from SEO entry
  const formData = {
    entityId: seo.entityId,
    industryType: seo.industryType,
    metaTitle: seo.metaTitle,
    metaDescription: seo.metaDescription,
    canonicalUrl: seo.canonicalUrl || "",
    robots: seo.robots,
    keywords: seo.keywords,

    // Social Media
    openGraphTitle: seo.socialMedia.openGraphTitle || "",
    openGraphImages: seo.socialMedia.openGraphImages
      ? JSON.stringify(seo.socialMedia.openGraphImages, null, 2)
      : "",
    twitterCardType: seo.socialMedia.twitterCardType || "",
    twitterImages: seo.socialMedia.twitterImages
      ? JSON.stringify(seo.socialMedia.twitterImages, null, 2)
      : "",

    // Technical SEO
    securityHeaders: seo.technicalSEO.securityHeaders,
    preloadAssets: seo.technicalSEO.preloadAssets,
    httpEquiv: seo.technicalSEO.httpEquiv,

    // Localization
    defaultLanguage: seo.localization.defaultLanguage,
    supportedLanguages: seo.localization.supportedLanguages,
    hreflang: seo.localization.hreflang
      ? JSON.stringify(seo.localization.hreflang, null, 2)
      : "",

    // Advanced
    schemaOrg: seo.schemaOrg ? JSON.stringify(seo.schemaOrg, null, 2) : "",
    industryData: seo.industryData
      ? JSON.stringify(seo.industryData, null, 2)
      : "",
  };

  return (
    <div className="container mx-auto py-10 px-4 text-black">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Link
            href={`/seo/${id}`}
            className="text-blue-600 hover:text-blue-800 mr-2"
          >
            ← Back to SEO Entry
          </Link>
        </div>
        <h1 className="text-3xl font-bold">Edit SEO Entry</h1>
        <p className="text-gray-500 mt-1">
          Edit SEO settings for {seo.metaTitle || seo.entityId}
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <SeoForm defaultValues={formData} mode="edit" id={id} />
      </div>
    </div>
  );
}
