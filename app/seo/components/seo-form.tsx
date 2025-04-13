"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createSeoEntry,
  updateSeoEntry,
  type SeoFormData,
  type ServerActionResult,
} from "@/app/seo/actions/seo";
import { IndustryType } from "@prisma/client";

type SeoFormProps = {
  defaultValues: SeoFormData;
  mode: "create" | "edit";
  id?: string;
};

export default function SeoForm({ defaultValues, mode, id }: SeoFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<SeoFormData>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle array field changes (keywords, security headers, etc.)
  const handleArrayChange = (name: keyof SeoFormData, value: string[]) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add item to array field
  const addToArray = (name: keyof SeoFormData, value: string) => {
    if (!value.trim()) return;

    const currentArray = formData[name] as string[];
    handleArrayChange(name, [...currentArray, value.trim()]);
  };

  // Remove item from array field
  const removeFromArray = (name: keyof SeoFormData, index: number) => {
    const currentArray = formData[name] as string[];
    handleArrayChange(
      name,
      currentArray.filter((_, i) => i !== index)
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const result: ServerActionResult =
        mode === "create"
          ? await createSeoEntry(formData)
          : await updateSeoEntry(id!, formData);

      if (result.success) {
        // Manually redirect on success
        router.push("/seo");
        return;
      }

      // Handle errors
      if (!result.success) {
        setErrors(result.errors);

        // Scroll to the first error
        const firstErrorField = Object.keys(result.errors)[0];
        if (firstErrorField) {
          const element = document.getElementById(firstErrorField);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            element.focus();
          }
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors({ _form: ["An unexpected error occurred"] });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle keywords input
  const handleKeywordsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const keywordsArray = value
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);
    handleArrayChange("keywords", keywordsArray);
  };

  // Format keywords for display in input
  const formatKeywords = (keywords: string[]) => {
    return keywords.join(", ");
  };

  // Validate JSON input
  const isValidJson = (str: string) => {
    if (!str.trim()) return true;
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors._form && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
          {errors._form.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            type="button"
            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
              activeTab === "basic"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("basic")}
          >
            Basic SEO
          </button>
          <button
            type="button"
            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
              activeTab === "social"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("social")}
          >
            Social Media
          </button>
          <button
            type="button"
            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
              activeTab === "technical"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("technical")}
          >
            Technical SEO
          </button>
          <button
            type="button"
            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
              activeTab === "localization"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("localization")}
          >
            Localization
          </button>
          <button
            type="button"
            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
              activeTab === "advanced"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("advanced")}
          >
            Advanced
          </button>
        </nav>
      </div>

      {/* Basic SEO Tab */}
      {activeTab === "basic" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="entityId"
                className="block text-sm font-medium text-gray-700"
              >
                Entity ID
              </label>
              <input
                type="text"
                id="entityId"
                name="entityId"
                value={formData.entityId}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.entityId ? "border-red-500" : "border-gray-300"
                } shadow-sm p-2`}
                readOnly={mode === "edit"}
              />
              {errors.entityId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.entityId[0]}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Unique identifier for this SEO entry
              </p>
            </div>

            <div>
              <label
                htmlFor="industryType"
                className="block text-sm font-medium text-gray-700"
              >
                Industry Type
              </label>
              <select
                id="industryType"
                name="industryType"
                value={formData.industryType}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.industryType ? "border-red-500" : "border-gray-300"
                } shadow-sm p-2`}
              >
                {Object.values(IndustryType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.industryType && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.industryType[0]}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                The industry category for this SEO entry
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="metaTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Meta Title
            </label>
            <input
              type="text"
              id="metaTitle"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              maxLength={120}
              className={`mt-1 block w-full rounded-md border ${
                errors.metaTitle ? "border-red-500" : "border-gray-300"
              } shadow-sm p-2`}
            />
            {errors.metaTitle && (
              <p className="mt-1 text-sm text-red-600">{errors.metaTitle[0]}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Maximum 120 characters. Currently: {formData.metaTitle.length}/120
            </p>
          </div>

          <div>
            <label
              htmlFor="metaDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Meta Description
            </label>
            <textarea
              id="metaDescription"
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              maxLength={320}
              rows={3}
              className={`mt-1 block w-full rounded-md border ${
                errors.metaDescription ? "border-red-500" : "border-gray-300"
              } shadow-sm p-2`}
            />
            {errors.metaDescription && (
              <p className="mt-1 text-sm text-red-600">
                {errors.metaDescription[0]}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Maximum 320 characters. Currently:{" "}
              {formData.metaDescription.length}/320
            </p>
          </div>

          <div>
            <label
              htmlFor="canonicalUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Canonical URL
            </label>
            <input
              type="text"
              id="canonicalUrl"
              name="canonicalUrl"
              value={formData.canonicalUrl || ""}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.canonicalUrl ? "border-red-500" : "border-gray-300"
              } shadow-sm p-2`}
              placeholder="https://example.com/page"
            />
            {errors.canonicalUrl && (
              <p className="mt-1 text-sm text-red-600">
                {errors.canonicalUrl[0]}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              The preferred URL for this page (optional)
            </p>
          </div>

          <div>
            <label
              htmlFor="robots"
              className="block text-sm font-medium text-gray-700"
            >
              Robots
            </label>
            <select
              id="robots"
              name="robots"
              value={formData.robots}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.robots ? "border-red-500" : "border-gray-300"
              } shadow-sm p-2`}
            >
              <option value="index, follow">index, follow</option>
              <option value="noindex, follow">noindex, follow</option>
              <option value="index, nofollow">index, nofollow</option>
              <option value="noindex, nofollow">noindex, nofollow</option>
            </select>
            {errors.robots && (
              <p className="mt-1 text-sm text-red-600">{errors.robots[0]}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Controls how search engines crawl and index this page
            </p>
          </div>

          <div>
            <label
              htmlFor="keywords"
              className="block text-sm font-medium text-gray-700"
            >
              Keywords
            </label>
            <input
              type="text"
              id="keywords"
              name="keywords"
              value={formatKeywords(formData.keywords)}
              onChange={handleKeywordsInput}
              className={`mt-1 block w-full rounded-md border ${
                errors.keywords ? "border-red-500" : "border-gray-300"
              } shadow-sm p-2`}
              placeholder="keyword1, keyword2, keyword3"
            />
            {errors.keywords && (
              <p className="mt-1 text-sm text-red-600">{errors.keywords[0]}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Comma-separated keywords for this page
            </p>
          </div>
        </div>
      )}

      {/* Social Media Tab */}
      {activeTab === "social" && (
        <div className="space-y-6">
          <div>
            <label
              htmlFor="openGraphTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Open Graph Title
            </label>
            <input
              type="text"
              id="openGraphTitle"
              name="openGraphTitle"
              value={formData.openGraphTitle || ""}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.openGraphTitle ? "border-red-500" : "border-gray-300"
              } shadow-sm p-2`}
              placeholder="Title for social sharing"
            />
            {errors.openGraphTitle && (
              <p className="mt-1 text-sm text-red-600">
                {errors.openGraphTitle[0]}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Title used when sharing on social media (leave empty to use meta
              title)
            </p>
          </div>

          <div>
            <label
              htmlFor="openGraphImages"
              className="block text-sm font-medium text-gray-700"
            >
              Open Graph Images (JSON)
            </label>
            <textarea
              id="openGraphImages"
              name="openGraphImages"
              value={formData.openGraphImages || ""}
              onChange={handleChange}
              rows={5}
              className={`mt-1 block w-full rounded-md border ${
                errors.openGraphImages ||
                !isValidJson(formData.openGraphImages || "")
                  ? "border-red-500"
                  : "border-gray-300"
              } shadow-sm p-2 font-mono text-sm`}
              placeholder='[{"url": "https://example.com/image.jpg", "width": 1200, "height": 630, "alt": "Description"}]'
            />
            {errors.openGraphImages && (
              <p className="mt-1 text-sm text-red-600">
                {errors.openGraphImages[0]}
              </p>
            )}
            {!isValidJson(formData.openGraphImages || "") && (
              <p className="mt-1 text-sm text-red-600">Invalid JSON format</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              JSON array of images for social media sharing (optional)
            </p>
          </div>

          <div>
            <label
              htmlFor="twitterCardType"
              className="block text-sm font-medium text-gray-700"
            >
              Twitter Card Type
            </label>
            <select
              id="twitterCardType"
              name="twitterCardType"
              value={formData.twitterCardType || ""}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.twitterCardType ? "border-red-500" : "border-gray-300"
              } shadow-sm p-2`}
            >
              <option value="">Select card type</option>
              <option value="summary">Summary</option>
              <option value="summary_large_image">
                Summary with Large Image
              </option>
              <option value="app">App</option>
              <option value="player">Player</option>
            </select>
            {errors.twitterCardType && (
              <p className="mt-1 text-sm text-red-600">
                {errors.twitterCardType[0]}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              The type of Twitter card to use (optional)
            </p>
          </div>

          <div>
            <label
              htmlFor="twitterImages"
              className="block text-sm font-medium text-gray-700"
            >
              Twitter Images (JSON)
            </label>
            <textarea
              id="twitterImages"
              name="twitterImages"
              value={formData.twitterImages || ""}
              onChange={handleChange}
              rows={5}
              className={`mt-1 block w-full rounded-md border ${
                errors.twitterImages ||
                !isValidJson(formData.twitterImages || "")
                  ? "border-red-500"
                  : "border-gray-300"
              } shadow-sm p-2 font-mono text-sm`}
              placeholder='[{"url": "https://example.com/image.jpg", "alt": "Description"}]'
            />
            {errors.twitterImages && (
              <p className="mt-1 text-sm text-red-600">
                {errors.twitterImages[0]}
              </p>
            )}
            {!isValidJson(formData.twitterImages || "") && (
              <p className="mt-1 text-sm text-red-600">Invalid JSON format</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              JSON array of images for Twitter cards (optional)
            </p>
          </div>
        </div>
      )}

      {/* Technical SEO Tab */}
      {activeTab === "technical" && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Security Headers
            </label>
            <div className="mt-1 space-y-2">
              {formData.securityHeaders.map((header, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    value={header}
                    onChange={(e) => {
                      const newHeaders = [...formData.securityHeaders];
                      newHeaders[index] = e.target.value;
                      handleArrayChange("securityHeaders", newHeaders);
                    }}
                    className="block w-full rounded-md border border-gray-300 shadow-sm p-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeFromArray("securityHeaders", index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Add security header (e.g., X-Frame-Options: DENY)"
                  className="block w-full rounded-md border border-gray-300 shadow-sm p-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addToArray("securityHeaders", e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget
                      .previousElementSibling as HTMLInputElement;
                    addToArray("securityHeaders", input.value);
                    input.value = "";
                  }}
                  className="ml-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
            {errors.securityHeaders && (
              <p className="mt-1 text-sm text-red-600">
                {errors.securityHeaders[0]}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Security headers to include in HTTP responses
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preload Assets
            </label>
            <div className="mt-1 space-y-2">
              {formData.preloadAssets.map((asset, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    value={asset}
                    onChange={(e) => {
                      const newAssets = [...formData.preloadAssets];
                      newAssets[index] = e.target.value;
                      handleArrayChange("preloadAssets", newAssets);
                    }}
                    className="block w-full rounded-md border border-gray-300 shadow-sm p-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeFromArray("preloadAssets", index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Add asset URL to preload"
                  className="block w-full rounded-md border border-gray-300 shadow-sm p-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addToArray("preloadAssets", e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget
                      .previousElementSibling as HTMLInputElement;
                    addToArray("preloadAssets", input.value);
                    input.value = "";
                  }}
                  className="ml-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
            {errors.preloadAssets && (
              <p className="mt-1 text-sm text-red-600">
                {errors.preloadAssets[0]}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Assets to preload for better performance
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              HTTP Equiv
            </label>
            <div className="mt-1 space-y-2">
              {formData.httpEquiv.map((equiv, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    value={equiv}
                    onChange={(e) => {
                      const newEquiv = [...formData.httpEquiv];
                      newEquiv[index] = e.target.value;
                      handleArrayChange("httpEquiv", newEquiv);
                    }}
                    className="block w-full rounded-md border border-gray-300 shadow-sm p-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeFromArray("httpEquiv", index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Add HTTP equiv (e.g., content-type: text/html; charset=utf-8)"
                  className="block w-full rounded-md border border-gray-300 shadow-sm p-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addToArray("httpEquiv", e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget
                      .previousElementSibling as HTMLInputElement;
                    addToArray("httpEquiv", input.value);
                    input.value = "";
                  }}
                  className="ml-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
            {errors.httpEquiv && (
              <p className="mt-1 text-sm text-red-600">{errors.httpEquiv[0]}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              HTTP-Equiv meta tags for the page
            </p>
          </div>
        </div>
      )}

      {/* Localization Tab */}
      {activeTab === "localization" && (
        <div className="space-y-6">
          <div>
            <label
              htmlFor="defaultLanguage"
              className="block text-sm font-medium text-gray-700"
            >
              Default Language
            </label>
            <input
              type="text"
              id="defaultLanguage"
              name="defaultLanguage"
              value={formData.defaultLanguage}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.defaultLanguage ? "border-red-500" : "border-gray-300"
              } shadow-sm p-2`}
              placeholder="ar-SA"
            />
            {errors.defaultLanguage && (
              <p className="mt-1 text-sm text-red-600">
                {errors.defaultLanguage[0]}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              The default language code for this page (e.g., ar-SA, en-US)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Supported Languages
            </label>
            <div className="mt-1 space-y-2">
              {formData.supportedLanguages.map((lang, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    value={lang}
                    onChange={(e) => {
                      const newLangs = [...formData.supportedLanguages];
                      newLangs[index] = e.target.value;
                      handleArrayChange("supportedLanguages", newLangs);
                    }}
                    className="block w-full rounded-md border border-gray-300 shadow-sm p-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeFromArray("supportedLanguages", index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Add language code (e.g., en-US)"
                  className="block w-full rounded-md border border-gray-300 shadow-sm p-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addToArray("supportedLanguages", e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget
                      .previousElementSibling as HTMLInputElement;
                    addToArray("supportedLanguages", input.value);
                    input.value = "";
                  }}
                  className="ml-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
            {errors.supportedLanguages && (
              <p className="mt-1 text-sm text-red-600">
                {errors.supportedLanguages[0]}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Language codes supported by this page
            </p>
          </div>

          <div>
            <label
              htmlFor="hreflang"
              className="block text-sm font-medium text-gray-700"
            >
              Hreflang (JSON)
            </label>
            <textarea
              id="hreflang"
              name="hreflang"
              value={formData.hreflang || ""}
              onChange={handleChange}
              rows={5}
              className={`mt-1 block w-full rounded-md border ${
                errors.hreflang || !isValidJson(formData.hreflang || "")
                  ? "border-red-500"
                  : "border-gray-300"
              } shadow-sm p-2 font-mono text-sm`}
              placeholder='{"en-US": "https://example.com/en", "ar-SA": "https://example.com/ar"}'
            />
            {errors.hreflang && (
              <p className="mt-1 text-sm text-red-600">{errors.hreflang[0]}</p>
            )}
            {!isValidJson(formData.hreflang || "") && (
              <p className="mt-1 text-sm text-red-600">Invalid JSON format</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              JSON mapping of language codes to URLs
            </p>
          </div>
        </div>
      )}

      {/* Advanced Tab */}
      {activeTab === "advanced" && (
        <div className="space-y-6">
          <div>
            <label
              htmlFor="schemaOrg"
              className="block text-sm font-medium text-gray-700"
            >
              Schema.org (JSON-LD)
            </label>
            <textarea
              id="schemaOrg"
              name="schemaOrg"
              value={formData.schemaOrg || ""}
              onChange={handleChange}
              rows={8}
              className={`mt-1 block w-full rounded-md border ${
                errors.schemaOrg || !isValidJson(formData.schemaOrg || "")
                  ? "border-red-500"
                  : "border-gray-300"
              } shadow-sm p-2 font-mono text-sm`}
              placeholder='{"@context": "https://schema.org", "@type": "WebPage", "name": "Page Title"}'
            />
            {errors.schemaOrg && (
              <p className="mt-1 text-sm text-red-600">{errors.schemaOrg[0]}</p>
            )}
            {!isValidJson(formData.schemaOrg || "") && (
              <p className="mt-1 text-sm text-red-600">Invalid JSON format</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Structured data in JSON-LD format
            </p>
          </div>

          <div>
            <label
              htmlFor="industryData"
              className="block text-sm font-medium text-gray-700"
            >
              Industry-Specific Data (JSON)
            </label>
            <textarea
              id="industryData"
              name="industryData"
              value={formData.industryData || ""}
              onChange={handleChange}
              rows={8}
              className={`mt-1 block w-full rounded-md border ${
                errors.industryData || !isValidJson(formData.industryData || "")
                  ? "border-red-500"
                  : "border-gray-300"
              } shadow-sm p-2 font-mono text-sm`}
              placeholder='{"productDetails": {"sku": "ABC123", "manufacturer": "Example Corp"}}'
            />
            {errors.industryData && (
              <p className="mt-1 text-sm text-red-600">
                {errors.industryData[0]}
              </p>
            )}
            {!isValidJson(formData.industryData || "") && (
              <p className="mt-1 text-sm text-red-600">Invalid JSON format</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Industry-specific data in JSON format
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <button
          type="button"
          onClick={() => router.push("/seo")}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting
            ? "Saving..."
            : mode === "create"
            ? "Create SEO Entry"
            : "Update SEO Entry"}
        </button>
      </div>
    </form>
  );
}
