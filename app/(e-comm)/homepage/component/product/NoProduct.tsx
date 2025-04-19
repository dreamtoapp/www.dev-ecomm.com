"use client";
import React from 'react';

import { SearchX } from 'lucide-react';
import { useRouter } from 'next/navigation';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface NoDataProps {
  message?: string;
}

const NoProduct = ({
  message = "عذرًا، لم نعثر على ما تبحث عنه 🧐",
}: NoDataProps) => {
  const router = useRouter();

  const handleExploreCollection = () => {
    router.push("/");
  };

  return (
    <div dir="rtl" className="flex flex-col items-center justify-center min-h-[400px] gap-6 p-6">
      <Alert className="max-w-lg bg-gradient-to-l from-secondary/20 to-background shadow-lg border-0 rounded-2xl">
        <div className="flex flex-col items-center text-center gap-4 px-4 py-6">
          <div className="p-3 bg-primary/10 rounded-full">
            <SearchX className="h-12 w-12 text-primary/80 stroke-[1.5]" />
          </div>
          <AlertTitle className="text-2xl font-bold text-foreground leading-snug">
            {message}
          </AlertTitle>
          <AlertDescription className="text-muted-foreground/90 text-lg">
            لا تقلق! يمكنك تعديل خيارات البحث أو اكتشاف تشكيلتنا الرائعة من المنتجات ✨
          </AlertDescription>
        </div>
      </Alert>

      <Button
        onClick={handleExploreCollection}
        size="lg"
        className="gap-2 text-lg font-semibold px-8 py-6 rounded-xl hover:shadow-md transition-all duration-300 hover:scale-[1.03]"
      >
        <span>استكشف التشكيلة الآن</span>
        <span>🛍️</span>
      </Button>
    </div>
  );
};

export default React.memo(NoProduct);