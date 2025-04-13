// actions/createOrder.ts
"use server";
import db from "@/lib/prisma";
import { generateOrderNumber } from "../helpers/orderNumber";
import { OrderCartItem } from "../../../../types/order";
import { pusher } from "@/lib/pusher";
import { Notification } from "@/types/notification";

export async function CreateOrderInDb(orderData: {
  userId: string;
  phone: string;
  name: string;
  address: string;
  lat: string;
  lng: string;
  cart: OrderCartItem[];
  totalAmount: number;
  totalItems: number;
  shiftId: string;
}) {
  try {
    const orderNumber = await generateOrderNumber();

    const createdOrder = await db.order.create({
      data: {
        orderNumber,
        customerId: orderData.userId,
        customerName: orderData.name,
        amount: orderData.totalAmount,
        shiftId: orderData.shiftId,
        latitude: orderData.lat,
        longitude: orderData.lng,
        items: {
          create: orderData.cart.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    // إنشاء إشعار الطلب
    const notification: Notification = {
      id: createdOrder.id,
      type: "order",
      title: `طلب جديد #${orderNumber}`,
      content: `عميل: ${orderData.name} - المبلغ: ${orderData.totalAmount} ر.س`,
      read: false,
      metadata: {
        orderId: createdOrder.id,
        customerName: orderData.name,
        totalAmount: orderData.totalAmount,
        itemsCount: orderData.totalItems,
      },
    };

    // إرسال الإشعار عبر Pusher
    await pusher.trigger(
      "admin-notifications",
      "new-notification",
      notification
    );

    return createdOrder.orderNumber;
  } catch (error) {
    console.error("فشل في إنشاء الطلب:", error);
    throw new Error("حدث خطأ أثناء إنشاء الطلب");
  }
}
