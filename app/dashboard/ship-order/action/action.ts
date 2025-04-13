"use server";

import { revalidatePath } from "next/cache";
import db from "../../../../lib/prisma";

export const getOrder = async (id: string) => {
  const data = await db.order.findUnique({
    where: { id },
    include: {
      items: { include: { product: true } },
      shift: true,
      customer: true,
    },
  });
  return data;
};

export const getDriver = async () => {
  const data = await db.driver.findMany({ select: { id: true, name: true } });
  return data;
};

export const approveDriverToOrder = async (
  orderId: string,
  driverId: string
) => {
  const data = await db.order.update({
    where: { id: orderId },
    data: {
      driverId: driverId,
      status: "InWay",
    },
  });
  revalidatePath("/dashboard");
  return data;
};
