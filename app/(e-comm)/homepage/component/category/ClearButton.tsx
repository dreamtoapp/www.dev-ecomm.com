'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

const ClearButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClear = () => {
    if (searchParams.toString()) {
      router.push(window.location.pathname); // Removes query parameters
    }
  };

  // Only show the button if there are query parameters
  if (!searchParams.toString()) {
    return null;
  }

  return (
    <Button
      onClick={handleClear}
      variant="destructive"
      className="flex items-center gap-2"
    >
      <XCircle className="w-5 h-5" />
    </Button>
  );
};

export default ClearButton;
