import React from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

export default function ProductRowActions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="icon" onClick={onEdit} title="تعديل المنتج">
        <MoreHorizontal className="w-4 h-4" />
      </Button>
      <Button variant="destructive" size="icon" onClick={onDelete} title="حذف المنتج">
        <span className="sr-only">حذف</span>
        🗑️
      </Button>
    </div>
  );
}
