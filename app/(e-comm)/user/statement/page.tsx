import React from 'react';
import { format } from 'date-fns';
import { Download, FileText, AlertCircle } from 'lucide-react';
import { userStatment } from './action/action';
import EmptyState from '../../../../components/warinig-msg';

interface Order {
  id: string;
  status: string;
  orderNumber: string;
  createdAt: Date;
  amount: number;
}

interface UserStatement {
  id: string;
  phone: string;
  name: string;
  email: string;
  orders: Order[];
}

type OrderStatus = 'delivered' | 'pending' | 'inway' | 'canceled';

async function StatementPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const userId = resolvedSearchParams.id;

  if (!userId) return <EmptyState message="معرّف المستخدم غير صالح" />;

  const statement = await userStatment(userId) as UserStatement | null;

  if (!statement?.orders?.length) {
    return <EmptyState message="لا توجد طلبات مرتبطة بهذا المستخدم" />;
  }

  const totalSpent = statement.orders.reduce((sum, order) => sum + order.amount, 0);
  const orderCounts = statement.orders.reduce((acc, order) => {
    acc[order.status.toLowerCase() as OrderStatus] = (acc[order.status.toLowerCase() as OrderStatus] || 0) + 1;
    return acc;
  }, {} as Record<OrderStatus, number>);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6" dir="rtl">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">كشف حساب المستخدم</h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4">
          <p className="text-gray-600 text-sm md:text-base">
            <span className="font-medium">{statement?.name}</span>
          </p>
        </div>
      </div>

      {/* Summary Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <SummaryCard
          title="إجمالي الإنفاق"
          value={`$${totalSpent.toFixed(2)}`}
          icon={<FileText className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />}
        />
        <SummaryCard
          title="عدد الطلبات"
          value={statement.orders.length}
          icon={<FileText className="h-6 w-6 md:h-8 md:w-8 text-green-600" />}
        />
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md space-y-2 md:space-y-4">
          <h3 className="text-base md:text-lg font-medium text-gray-800">حالة الطلبات</h3>
          {Object.entries(orderCounts).map(([status, count]) => (
            <div key={status} className="flex justify-between items-center">
              <span className="text-gray-600 capitalize text-sm md:text-base">{status}</span>
              <span className={`font-medium ${getStatusColor(status as OrderStatus)} px-2 md:px-3 py-1 rounded-full text-sm md:text-base`}>
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 md:px-6 text-right text-sm md:text-base">رقم الطلب</th>
                <th className="py-3 px-4 md:px-6 text-right text-sm md:text-base">التاريخ</th>
                <th className="py-3 px-4 md:px-6 text-right text-sm md:text-base">المبلغ</th>
                <th className="py-3 px-4 md:px-6 text-right text-sm md:text-base">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {statement.orders.map((order: Order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50 transition">
                  <td className="py-3 px-4 md:px-6 font-medium text-sm md:text-base">{order.orderNumber}</td>
                  <td className="py-3 px-4 md:px-6 text-gray-600 text-sm md:text-base">
                    {format(new Date(order.createdAt), 'dd MMM yyyy')}
                  </td>
                  <td className="py-3 px-4 md:px-6 text-green-600 font-medium text-sm md:text-base">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 md:px-6">
                    <span className={`px-2 md:px-3 py-1 rounded-full text-sm md:text-base ${getStatusColor(order.status.toLowerCase() as OrderStatus)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const SummaryCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) => (
  <div className="bg-white p-4 md:p-6 rounded-lg shadow-md flex items-center gap-3 md:gap-4">
    <div className="bg-blue-100 p-2 md:p-3 rounded-lg">{icon}</div>
    <div>
      <h3 className="text-base md:text-lg font-medium text-gray-800">{title}</h3>
      <p className="text-xl md:text-2xl text-gray-900 mt-1">{value}</p>
    </div>
  </div>
);



const getStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case 'delivered':
      return 'bg-green-100 text-green-600';
    case 'pending':
      return 'bg-yellow-100 text-yellow-600';
    case 'inway':
      return 'bg-blue-100 text-blue-600';
    case 'canceled':
      return 'bg-red-100 text-red-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export default StatementPage;