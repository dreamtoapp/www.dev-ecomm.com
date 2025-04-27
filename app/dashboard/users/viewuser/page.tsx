import React from 'react';

import { format } from 'date-fns';

import { userData } from '../action/actions';
import uniqeId from '@/utils/uniqeId';

async function page({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const USERID = resolvedSearchParams.id;
  const user = await userData(USERID as string);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-green-600 text-center mb-10 text-3xl font-extrabold">
        تفاصيل  وحركة المستخدم
      </h1>
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
        {user ? (
          <>
            <div className="mb-8">

              <p className="mb-4 text-lg">
                <strong className="text-gray-700">الاسم:</strong>{' '}
                <span className="text-gray-900">{user.name}</span>
              </p>
              <p className="mb-4 text-lg">
                <strong className="text-gray-700">البريد الإلكتروني:</strong>{' '}
                <span className="text-gray-900">{user.email}</span>
              </p>
              <p className="mb-4 text-lg">
                <strong className="text-gray-700">الهاتف:</strong>{' '}
                <span className="text-gray-900">{user.phone}</span>
              </p>
              <p className="mb-4 text-lg">
                <strong className="text-gray-700">العنوان:</strong>{' '}
                <span className="text-gray-900">{user.address}</span>
              </p>
            </div>
            <h2 className="mt-10 text-blue-600 border-b-2 border-blue-600 pb-2 text-xl font-semibold">
              الطلبات
            </h2>
            <p className="mt-4 text-gray-800 text-lg">
              <strong>عدد الطلبات:</strong>{' '}
              {user.orders ? user.orders.length : 0}
            </p>
            {user.orders && user.orders.length > 0 ? (
              <ul className="list-none mt-6 space-y-6">
                {user.orders.map((order: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-5 rounded-lg shadow-md">
                    <li className="mb-4">
                      <p className="mb-2 text-lg bg-primary text-primary-foreground p-2 rounded-lg">
                        <strong >حالة الطلب:</strong>{' '}
                        <span >{order.status}</span>
                      </p>
                      <p className="mb-2 text-lg">
                        <strong className="text-gray-700">رقم الطلب:</strong>{' '}
                        <span className="text-gray-900">{order.id}</span>
                      </p>
                      <p className="mb-2 text-lg">
                        <strong className="text-gray-700">التاريخ:</strong>{' '}
                        <span className="text-gray-900">{format(new Date(order.createdAt), 'yyyy-MM-dd')}</span>
                      </p>
                      <p className="mb-2 text-lg">
                        <strong className="text-gray-700">المبلغ:</strong>{' '}
                        <span className="text-gray-900">{order.amount.toFixed(2)}</span>
                      </p>
                    </li>
                    {order.items && order.items.length > 0 && (
                      <div className="mt-4 flex items-center flex-col gap-2 w-full">
                        {order.items.map((item: any, itemIndex: number) => (
                          <div
                            key={uniqeId()}
                            className="flex  items-center justify-between bg-secondary p-2 rounded-lg shadow-sm border border-gray-200 w-full"
                          >
                            <p className="text-lg font-medium text-gray-800">
                              <strong className="text-gray-700">المنتج:</strong>{' '}
                              {item.product.name}
                            </p>
                            <p className="text-lg text-gray-600">
                              <strong className="text-gray-700">الكمية:</strong>{' '}
                              {item.quantity}
                            </p>
                          </div>

                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </ul>
            ) : (
              <p className="mt-6 text-gray-500 text-lg">
                لا توجد طلبات متوفرة.
              </p>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            بيانات المستخدم غير متوفرة.
          </p>
        )}
      </div>
    </div>
  );
}

export default page;
