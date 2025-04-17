"use server";
import { cacheData } from '@/lib/cache';
import db from '@/lib/prisma';
import { Order } from '@/types/cardType';

// Cached fetchOrdersAction
export const fetchOrdersAction = cacheData(
  async ({
    status,
    page = 1,
    pageSize = 10,
  }: {
    status?: string;
    page?: number;
    pageSize?: number;
  }) => {
    console.log(status);

    try {
      const orders = await db.order.findMany({
        where: status ? { status } : {},
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          orderNumber: true,
          customerName: true,
          status: true,
          isTripStart: true,
          resonOfcancel: true,
          amount: true,
          createdAt: true,
          updatedAt: true,
          customerId: true,
          shiftId: true,
          driverId: true,
          items: {
            select: {
              id: true,
              productId: true,
              quantity: true,
              price: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                },
              },
            },
          },
          shift: {
            select: {
              id: true,
              name: true,
            },
          },
          customer: {
            select: {
              id: true,
              phone: true,
              name: true,
              address: true,
              latitude: true,
              longitude: true,
            },
          },
          driver: {
            select: {
              id: true,
              name: true,
              phone: true,
            },
          },
        },
        orderBy: { updatedAt: 'desc' },
      });
      console.log(orders);
      return orders as Order[];
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw new Error('Failed to fetch orders.');
    }
  },
  ["fetchOrders"], // Cache key
  { revalidate: 3600 } // Revalidate every hour
);



