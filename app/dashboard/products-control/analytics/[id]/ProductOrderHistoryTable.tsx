import React, { useMemo, useState } from "react";
import { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationNav
} from "@/components/ui/pagination";

interface OrderHistoryItem {
  date: string;
  orderId: string;
  orderNumber?: string;
  customer: string;
  quantity: number;
  price: number;
  total?: number; // الكمية * السعر
}

interface ProductOrderHistoryTableProps {
  data: OrderHistoryItem[];
  pageSizeOptions?: number[];
}

const DEFAULT_PAGE_SIZE = 10;

const ProductOrderHistoryTable: React.FC<ProductOrderHistoryTableProps> = ({ data, pageSizeOptions = [10, 20, 50] }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const totalPages = Math.ceil(data.length / pageSize) || 1;
  const pagedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize]);

  // Reset to page 1 if data/pageSize changes
  React.useEffect(() => { setPage(1); }, [data, pageSize]);

  // إجمالي الصفحة الحالية
  const pageTotal = pagedData.reduce((sum, item) => sum + (item.quantity * (item.price || 0)), 0);
  // الإجمالي العام
  const grandTotal = data.reduce((sum, item) => sum + (item.quantity * (item.price || 0)), 0);

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8 overflow-x-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h2 className="text-xl font-bold text-primary">سجل حركات المنتج</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">عدد الصفوف:</label>
          <select
            className="border rounded px-2 py-1 focus:outline-primary"
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
          >
            {pageSizeOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
      <Table className="min-w-[900px]">
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">التاريخ</TableHead>
            <TableHead className="text-right">رقم الطلب</TableHead>
            <TableHead className="text-right">اسم العميل</TableHead>
            <TableHead className="text-right">الكمية</TableHead>
            <TableHead className="text-right">السعر</TableHead>
            <TableHead className="text-right">الإجمالي</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pagedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">لا توجد بيانات لهذا النطاق الزمني</TableCell>
            </TableRow>
          ) : (
            pagedData.map((item, idx) => (
              <TableRow key={item.orderId + idx} className="hover:bg-muted/40 transition">
                <TableCell className="whitespace-nowrap">{item.date}</TableCell>
                <TableCell className="whitespace-nowrap">{item.orderNumber || item.orderId}</TableCell>
                <TableCell className="whitespace-nowrap" title={item.customer}>{item.customer}</TableCell>
                <TableCell className="text-right font-bold">{item.quantity}</TableCell>
                <TableCell className="text-right">{item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                <TableCell className="text-right font-bold text-blue-700">{(item.quantity * (item.price || 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        {data.length > 0 && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} className="text-left font-bold">الإجمالي العام</TableCell>
              <TableCell className="text-right font-bold text-green-700">{grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationNav
                      previousLabel="السابق"
                      nextLabel="التالي"
                    >
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            isActive={page === i + 1}
                            onClick={() => setPage(i + 1)}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                    </PaginationNav>
                  </PaginationContent>
                </Pagination>
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
};

export default ProductOrderHistoryTable;
