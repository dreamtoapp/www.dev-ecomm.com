import { ArrowDownFromLine } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { getOrderData } from '../actions/getOrderData';

// Order Type Definition
interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  invoiceNo: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  items: OrderItem[];
  status: string;
  shift: string;
}
interface ParamsProp {
  searchParams: Promise<{ status?: string }>;
  params: Promise<{ invoiceid: string }>


}

export default async function InvoicePage({
  params,
  searchParams
}:
  ParamsProp
) {
  const orderId = (await params).invoiceid;
  const order = await getOrderData(orderId as string);
  const resolvedSearchParams = await searchParams;
  const status = resolvedSearchParams.status;


  return (
    <div className='max-w-3xl mx-auto my-10 '>


      <Button> تحميل الفاتورة<ArrowDownFromLine /></Button>
      <div className=" p-6 shadow-md rounded-md text-right bg-white">

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              الفاتورة #{order?.invoiceNo}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              <strong>العميل:</strong> {order?.customerName}
            </p>
            <p>
              <strong>البريد الإلكتروني:</strong> {order?.customerEmail}
            </p>
            <p>
              <strong>رقم الطلب:</strong> {order?.orderNumber}
            </p>
            <p>
              <strong>الوردية:</strong> {order?.shift}
            </p>
            <p>
              <strong>الحالة:</strong>{" "}
              <span className="text-green-600">{order?.status}</span>
            </p>
            <h3 className="text-xl font-semibold mt-4">عناصر الطلب</h3>
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">المنتج</th>
                  <th className="border p-2">الكمية</th>
                  <th className="border p-2">السعر</th>
                  <th className="border p-2">الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                {order?.items.map((item, index) => (
                  <tr key={index} className="border">
                    <td className="border p-2">{item.productName}</td>
                    <td className="border p-2">{item.quantity}</td>
                    <td className="border p-2">{item.price.toFixed(2)} ريال</td>
                    <td className="border p-2">
                      {(item.quantity * item.price).toFixed(2)} ريال
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className="text-xl font-semibold mt-4">الملخص</h3>
            <p>
              <strong>الإجمالي الفرعي:</strong> {order?.amount.toFixed(2)} ريال
            </p>
            <p>
              <strong>الضريبة (15%):</strong> {((order?.amount || 0) * 0.15).toFixed(2)} ريال
            </p>
            <p className="text-lg font-bold">
              <strong>الإجمالي:</strong> {((order?.amount || 0) * 1.15).toFixed(2)} ريال
            </p>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
