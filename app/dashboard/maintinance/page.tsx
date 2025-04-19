"use client"
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fixSupplierSlugs } from './action/fixSuppliereSlug';
import Swal from 'sweetalert2';
import { fixProductSlugs } from './action/fixProductSlug';

export default function MaintenancePage() {
  const [loadingState, setLoadingState] = useState({
    supplier: false,
    product: false,
  });

  const handleFixSlugs = async () => {
    setLoadingState((prev) => ({ ...prev, supplier: true }));
    try {
      await fixSupplierSlugs();
      Swal.fire({
        icon: 'success',
        title: 'تمت العملية بنجاح!',
        text: 'تم إصلاح روابط الموردين بنجاح.',
        confirmButtonText: 'حسنًا',
      });
    } catch (error) {
      console.error('Error fixing supplier slugs:', error);
      Swal.fire({
        icon: 'error',
        title: 'فشلت العملية!',
        text: 'حدث خطأ أثناء إصلاح روابط الموردين.',
        confirmButtonText: 'حسنًا',
      });
    } finally {
      setLoadingState((prev) => ({ ...prev, supplier: false }));
    }
  };

  const handleFixProductSlugs = async () => {
    setLoadingState((prev) => ({ ...prev, product: true }));
    try {
      await fixProductSlugs();
      Swal.fire({
        icon: 'success',
        title: 'تمت العملية بنجاح!',
        text: 'تم إصلاح روابط المنتجات بنجاح.',
        confirmButtonText: 'حسنًا',
      });
    } catch (error) {
      console.error('Error fixing product slugs:', error);
      Swal.fire({
        icon: 'error',
        title: 'فشلت العملية!',
        text: 'حدث خطأ أثناء إصلاح روابط المنتجات.',
        confirmButtonText: 'حسنًا',
      });
    } finally {
      setLoadingState((prev) => ({ ...prev, product: false }));
    }
  };

  const categories = [
    {
      category: "إدارة الروابط",
      services: [
        {
          title: "إصلاح روابط الموردين",
          description: "إصلاح وتحديث جميع روابط الموردين تلقائيًا لضمان التناسق.",
          action: handleFixSlugs,
        },
        {
          title: "إصلاح روابط العناصر",
          description: "حل أي مشاكل في روابط العناصر للحفاظ على هيكل URL الصحيح.",
          action: handleFixProductSlugs,
        },
      ],
    },
    {
      category: "إدارة الصور",
      services: [
        {
          title: "تحسين الصور",
          description: "تحسين جميع الصور المرفوعة لتحسين الأداء وتقليل أوقات التحميل.",
          action: () => alert("وظيفة تحسين الصور قادمة قريبًا!"),
        },
        {
          title: "ضغط الصور",
          description: "ضغط الصور لتوفير مساحة التخزين وتحسين الأداء.",
          action: () => alert("وظيفة ضغط الصور قادمة قريبًا!"),
        },
      ],
    },
    {
      category: "ذاكرة التخزين المؤقت وخريطة الموقع",
      services: [
        {
          title: "مسح ذاكرة التخزين المؤقت",
          description: "مسح ذاكرة التخزين المؤقت للتطبيق لضمان عرض أحدث البيانات.",
          action: () => alert("وظيفة مسح ذاكرة التخزين المؤقت قادمة قريبًا!"),
        },
        {
          title: "إعادة بناء خريطة الموقع",
          description: "إعادة إنشاء خريطة الموقع للحفاظ على تحديث محركات البحث.",
          action: () => alert("وظيفة إعادة بناء خريطة الموقع قادمة قريبًا!"),
        },
      ],
    },
    {
      category: "قاعدة البيانات والنسخ الاحتياطي",
      services: [
        {
          title: "تنظيف قاعدة البيانات",
          description: "إزالة السجلات غير المستخدمة أو اليتيمة لتحسين أداء قاعدة البيانات.",
          action: () => alert("وظيفة تنظيف قاعدة البيانات قادمة قريبًا!"),
        },
        {
          title: "نسخ البيانات احتياطيًا",
          description: "إنشاء نسخة احتياطية من قاعدة البيانات والملفات الهامة.",
          action: () => alert("وظيفة النسخ الاحتياطي قادمة قريبًا!"),
        },
      ],
    },
    {
      category: "تحسين محركات البحث والتصدير",
      services: [
        {
          title: "تحسين محركات البحث",
          description: "تحديث العلامات الوصفية والنصوص البديلة وغيرها من الحقول المتعلقة بـ SEO تلقائيًا.",
          action: () => alert("وظيفة تحسين محركات البحث قادمة قريبًا!"),
        },
        {
          title: "تصدير البيانات",
          description: "تصدير البيانات إلى CSV أو Excel للاستخدام الخارجي.",
          action: () => alert("وظيفة تصدير البيانات قادمة قريبًا!"),
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">صيانة التطبيق</h1>
      <p className="text-gray-600 mb-6">
        قم بتنفيذ مهام الصيانة المختلفة للحفاظ على تشغيل التطبيق بسلاسة.
      </p>
      {categories.map((category, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{category.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.services.map((service, idx) => (
              <Card key={idx} className="shadow-lg">
                <CardHeader>
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">{service.description}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={service.action}
                    className="bg-blue-500 hover:bg-blue-600 text-white flex items-center"
                    disabled={
                      (loadingState.supplier && service.title === "إصلاح روابط الموردين") ||
                      (loadingState.product && service.title === "إصلاح روابط العناصر")
                    }
                  >
                    {loadingState.supplier && service.title === "إصلاح روابط الموردين" && (
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                    )}
                    {loadingState.product && service.title === "إصلاح روابط العناصر" && (
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                    )}
                    تشغيل
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

