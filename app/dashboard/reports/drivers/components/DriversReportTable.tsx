import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DriversReportTableProps {
  drivers: Array<{
    id: string;
    name: string;
    phone?: string;
    orders?: Array<{
      id: string;
      status: string;
      amount: number;
    }>;
  }>;
}



interface DriversReportTablePropsWithPage extends DriversReportTableProps {
  page: number;
}

export function DriversReportTable({ drivers, page }: DriversReportTablePropsWithPage) {
  return (
    <Card>
      <CardContent className="overflow-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">اسم السائق</TableHead>
              <TableHead className="text-right">رقم الجوال</TableHead>
              <TableHead className="text-right">إجمالي الطلبات</TableHead>
              <TableHead className="text-right">الطلبات المكتملة</TableHead>
              <TableHead className="text-right">الطلبات الملغاة</TableHead>
              <TableHead className="text-right">إجمالي الأرباح</TableHead>
              <TableHead className="text-right">المزيد</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-400">لا توجد بيانات سائقين</TableCell>
              </TableRow>
            )}
            {drivers.map((driver) => {
              const totalOrders = driver.orders?.length || 0;
              const completedOrders = driver.orders?.filter(o => o.status === 'Completed').length || 0;
              const cancelledOrders = driver.orders?.filter(o => o.status === 'Cancelled').length || 0;
              const totalEarnings = driver.orders?.reduce((sum, o) => sum + (o.status === 'Completed' ? o.amount : 0), 0) || 0;
              return (
                <TableRow key={driver.id}>
                  <TableCell className="font-bold">{driver.name}</TableCell>
                  <TableCell>{driver.phone || '-'}</TableCell>
                  <TableCell>{totalOrders}</TableCell>
                  <TableCell>{completedOrders}</TableCell>
                  <TableCell>{cancelledOrders}</TableCell>
                  <TableCell>{totalEarnings.toLocaleString('ar-EG', { minimumFractionDigits: 2 })} ر.س</TableCell>
                  <TableCell>
                    <a href={`/dashboard/reports/drivers/${driver.id}`} className="text-blue-600 underline hover:text-blue-800">مزيد من المعلومات</a>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
