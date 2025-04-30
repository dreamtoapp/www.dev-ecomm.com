import { getDriverOrders } from '../actions/getDriverOrders';
import { getDriversReport } from '../actions/getDriversReport';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function DriverDetailsPage({ params, searchParams }: {
  params: Promise<{ driverId: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { driverId } = await params;
  const sp = await searchParams;
  const page = sp?.page ? Number(sp.page) : 1;
  const pageSize = 10;

  // Fetch driver info (name, etc)
  const drivers = await getDriversReport();
  const driver = drivers.find((d: any) => d.id === driverId);

  // Fetch orders for this driver
  const { orders, totalCount } = await getDriverOrders(driverId, page, pageSize);
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">تفاصيل السائق: {driver?.name || driverId}</h2>
        <a href="/dashboard/reports/drivers" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">رجوع</a>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="text-right">
            <TableHead className="text-right">رقم الطلب</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            <TableHead className="text-right">المبلغ</TableHead>
            <TableHead className="text-right">العميل</TableHead>
            <TableHead className="text-right">تاريخ الطلب</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-400">لا توجد طلبات لهذا السائق</TableCell>
            </TableRow>
          ) : orders.map((order: any) => (
            <TableRow key={order.id}>
              <TableCell className="text-right">{order.orderNumber || order.id}</TableCell>
              <TableCell className="text-right">{order.status}</TableCell>
              <TableCell className="text-right">{order.amount?.toLocaleString('ar-EG', { minimumFractionDigits: 2 })} ر.س</TableCell>
              <TableCell className="text-right">{order.customer?.name || '-'}</TableCell>
              <TableCell className="text-right">{order.createdAt ? new Date(order.createdAt).toLocaleString('ar-EG') : '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <a
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            href={`?page=${page - 1}`}
            aria-disabled={page === 1}
            tabIndex={page === 1 ? -1 : 0}
            style={{ pointerEvents: page === 1 ? 'none' : 'auto' }}
          >
            السابق
          </a>
          <span>صفحة {page} من {totalPages}</span>
          <a
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            href={`?page=${page + 1}`}
            aria-disabled={page === totalPages}
            tabIndex={page === totalPages ? -1 : 0}
            style={{ pointerEvents: page === totalPages ? 'none' : 'auto' }}
          >
            التالي
          </a>
        </div>
      )}
    </div>
  );
}
