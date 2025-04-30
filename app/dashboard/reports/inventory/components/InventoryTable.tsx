import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface InventoryTableProps {
  products: Array<{
    id: string;
    name: string;
    price: number;
    outOfStock: boolean;
    createdAt: string;
    updatedAt: string;
    supplier?: { name?: string } | null;
  }>;
}

export function InventoryTable({ products }: InventoryTableProps) {
  return (
    <Card>
      <CardContent className="overflow-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>المنتج</TableHead>
              <TableHead>الشركة</TableHead>
              <TableHead>السعر</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>تاريخ الإضافة</TableHead>
              <TableHead>آخر تحديث</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-400">لا توجد بيانات مخزون</TableCell>
              </TableRow>
            )}
            {products.map((p) => (
              <TableRow key={p.id} className={p.outOfStock ? 'bg-red-50' : ''}>
                <TableCell className="font-bold">{p.name}</TableCell>
                <TableCell>{p.supplier?.name || '-'}</TableCell>
                <TableCell>{p.price?.toLocaleString('ar-EG', { minimumFractionDigits: 2 })} ر.س</TableCell>
                <TableCell>
                  {p.outOfStock ? (
                    <span className="text-red-600 font-semibold">غير متوفر</span>
                  ) : (
                    <span className="text-green-700 font-semibold">متوفر</span>
                  )}
                </TableCell>
                <TableCell>{p.createdAt ? new Date(p.createdAt).toLocaleDateString('ar-EG') : '-'}</TableCell>
                <TableCell>{p.updatedAt ? new Date(p.updatedAt).toLocaleDateString('ar-EG') : '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
