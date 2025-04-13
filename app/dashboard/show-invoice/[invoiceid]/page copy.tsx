"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { sendInvoiceEmail } from "@/utils/sendInvoiceEmail";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { generateInvoicePDF } from "../../../../utils/generateInvoicePDF";
import { getOrderData } from "../actions/Actions";

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

export default function InvoicePage() {
  const { invoiceno } = useParams();
  // const invoiceNo = "ORD-20250214-000062";

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadOrder() {
      setLoading(true);
      const data = await getOrderData(invoiceno as string); // ✅ Get real order data
      setOrder(data);
      setLoading(false);
    }
    loadOrder();
  }, [invoiceno]);

  if (loading) return <p className="text-center">Loading Invoice...</p>;
  if (!order) return <p className="text-center">Invoice Not Found</p>;

  return (
    <div className="max-w-3xl mx-auto my-10 bg-white p-6 shadow-md rounded-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Invoice #{order.invoiceNo}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            <strong>Customer:</strong> {order.customerName}
          </p>
          <p>
            <strong>Email:</strong> {order.customerEmail}
          </p>
          <p>
            <strong>Order Number:</strong> {order.orderNumber}
          </p>
          <p>
            <strong>Shift:</strong> {order.shift}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="text-green-600">{order.status}</span>
          </p>

          <h3 className="text-xl font-semibold mt-4">Order Items</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Product</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index} className="border">
                  <td className="border p-2">{item.productName}</td>
                  <td className="border p-2">{item.quantity}</td>
                  <td className="border p-2">{item.price.toFixed(2)} SAR</td>
                  <td className="border p-2">
                    {(item.quantity * item.price).toFixed(2)} SAR
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="text-xl font-semibold mt-4">Summary</h3>
          <p>
            <strong>Subtotal:</strong> {order.amount.toFixed(2)} SAR
          </p>
          <p>
            <strong>VAT (15%):</strong> {(order.amount * 0.15).toFixed(2)} SAR
          </p>
          <p className="text-lg font-bold">
            <strong>Total:</strong> {(order.amount * 1.15).toFixed(2)} SAR
          </p>

          <div className="flex justify-between mt-6">
            {/* QR Code */}
            <div className="p-4 border rounded-lg">
              {/* <QRCodeCanvas
                value={`https://amwag.com/orders/${order.id}`}
                size={100}
              /> */}
            </div>

            <div className="space-y-2">
              {/* Download Invoice */}
              {/* <Button
                onClick={() => generateInvoicePDF(order)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
              >
                Download Invoice
              </Button> */}

              {/* Send Invoice via Email */}
              <Button
                onClick={async () => {
                  toast.info("Generating Invoice...");

                  // ✅ Now correctly generates a PDF as a Blob
                  const pdfBlob = await generateInvoicePDF(order); // 🔥 Ensure only one argument is passed

                  // ✅ Send Email with PDF Blob
                  await sendInvoiceEmail({
                    to: order.customerEmail,
                    orderNumber: order.orderNumber,
                    pdfBlob, // ✅ Now sending as Blob
                  });

                  toast.success("Invoice sent successfully!");
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-md w-full"
              >
                Send Invoice via Email
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
