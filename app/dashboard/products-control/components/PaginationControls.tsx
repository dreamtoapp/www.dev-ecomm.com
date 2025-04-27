"use client";
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface PaginationControlsProps {
  page: number;
  pageSize: number;
  total: number;
}

export default function PaginationControls({ page, pageSize, total }: PaginationControlsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(total / pageSize);

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-2 justify-center items-center mt-4">
      <Link href={createPageURL(page - 1)} aria-disabled={page === 1} tabIndex={page === 1 ? -1 : 0} className={page === 1 ? 'pointer-events-none opacity-50' : ''}>
        السابق
      </Link>
      <span className="text-sm font-medium">{page} / {totalPages}</span>
      <Link href={createPageURL(page + 1)} aria-disabled={page === totalPages} tabIndex={page === totalPages ? -1 : 0} className={page === totalPages ? 'pointer-events-none opacity-50' : ''}>
        التالي
      </Link>
    </div>
  );
}
