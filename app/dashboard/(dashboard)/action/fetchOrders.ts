"use server";
import db from '@/lib/prisma';
import { Order } from '@/types/cardType';

// action/fetchOrders.ts
export async function fetchOrdersAction({
  status,
  page = 1,
  pageSize = 10,
}: {
  status?: string;
  page?: number;
  pageSize?: number;
}) {
  console.log(status)

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
        customerId: true, // Added missing field
        shiftId: true,    // Added missing field
        driverId: true,   // Added missing field
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
            id: true, // Added the missing 'id' field
            name: true
          }
        },
        customer: {
          select: {
            id: true, // Added the missing 'id' field
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
    console.log(orders)
    return orders as Order[];
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Failed to fetch orders.');
  }
}



// export async function fetchOrders(status?: string) {
//   try {
//     const orders = await db.order.findMany({
//       where: status ? { status } : {}, // Filter by status if provided
//       select: {
//         id: true,
//         orderNumber: true,
//         customerId: true,
//         customerName: true,
//         driverId: true,
//         status: true,
//         resonOfcancel: true,
//         isTripStart: true,

//         amount: true,
//         createdAt: true,
//         updatedAt: true,
//         items: {
//           select: {
//             productId: true,
//             quantity: true,
//             price: true,
//           },
//         },
//         customer: {
//           select: {
//             phone: true,
//             name: true,
//             address: true,
//             latitude: true,
//             longitude: true,
//           },
//         },
//         driver: {
//           select: {
//             id: true,
//             name: true,
//             phone: true,
//           },
//         },
//         shift: { select: { name: true } },
//       },
//       orderBy: { updatedAt: "desc" }, // Order by creation date in descending order
//     });
//     return orders;
//   } catch (error: any) {
//     console.error("Error fetching orders:", error);
//     throw new Error("Failed to fetch orders.");
//   }
// }



