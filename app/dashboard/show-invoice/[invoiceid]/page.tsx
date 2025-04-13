"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { sendInvoiceEmail } from "@/utils/sendInvoiceEmail";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { getOrderData } from "../actions/Actions";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton for loading states
import { Truck } from "lucide-react"; // Import Truck icon
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"; // Import Radix UI Dialog components
import { Input } from "@/components/ui/input"; // Import Input component for CC field
import { generateInvoicePDF } from "../../../../utils/generateInvoicePDF";

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
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [ccEmail, setCcEmail] = useState(""); // State for CC email input
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null); // State for PDF preview URL

  useEffect(() => {
    async function loadOrder() {
      setLoading(true);
      try {
        const data = await getOrderData(invoiceno as string); // ✅ Get real order data
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order data:", error);
        toast.error("Failed to load invoice.");
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [invoiceno]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto my-10 bg-white p-6 shadow-md rounded-md">
        {/* Skeleton Loader */}
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48 mb-2" /> {/* Invoice Title */}
            <Skeleton className="h-4 w-32" /> {/* Subtitle */}
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Customer Details Skeleton */}
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            {/* Table Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" /> {/* Table Header */}
              <Skeleton className="h-8 w-full" /> {/* Table Row */}
              <Skeleton className="h-8 w-full" /> {/* Table Row */}
              <Skeleton className="h-8 w-full" /> {/* Table Row */}
            </div>
            {/* Summary Skeleton */}
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-8 w-32" /> {/* Total Amount */}
            {/* Buttons Skeleton */}
            <div className="flex justify-between mt-6">
              <Skeleton className="h-20 w-20" /> {/* QR Code */}
              <div className="space-y-2">
                <Skeleton className="h-10 w-40" /> {/* Download Button */}
                <Skeleton className="h-10 w-40" /> {/* Email Button */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!order) {
    return <p className="text-center">Invoice Not Found</p>;
  }

  // Function to handle shipping confirmation
  const handleShipOrder = async () => {
    toast.info("Updating order status...");
    try {
      // Simulate updating the order status to "InWay"
      // Replace this with your actual API call to update the order status
      // Example: await updateOrderStatus(order.id, "InWay");
      toast.success("Order shipped successfully!");
      setOrder((prevOrder) => {
        if (!prevOrder) return null;
        return { ...prevOrder, status: "InWay" };
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to ship the order.");
    }
  };

  // Function to generate and preview the PDF
  const handlePreviewPDF = async () => {
    try {
      const pdfBlob = await generateInvoicePDF(order);
      const url = URL.createObjectURL(pdfBlob); // Create a temporary URL for the Blob
      setPdfPreviewUrl(url); // Set the URL for preview
      toast.success("PDF generated successfully. You can now preview it.");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF.");
    }
  };

  // Function to handle sending the invoice email
  const handleSendInvoice = async () => {
    toast.info("Sending invoice...");
    try {
      const pdfBlob = await generateInvoicePDF(order);
      await sendInvoiceEmail({
        to: order.customerEmail,
        cc: ccEmail || undefined, // Add CC email if provided
        orderNumber: order.orderNumber,
        pdfBlob,
      });
      toast.success("Invoice sent successfully!");
    } catch (error) {
      console.error("Error sending invoice:", error);
      toast.error("Failed to send invoice.");
    }
  };

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
              {/* Preview PDF Button */}
              <Button
                onClick={handlePreviewPDF}
                className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
              >
                Preview PDF
              </Button>

              {/* Send Invoice via Email with Confirmation Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 text-white px-4 py-2 rounded-md w-full">
                    Send Invoice via Email
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Sending Invoice</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to send the invoice to{" "}
                      <span className="text-green-500">
                        {order.customerEmail}
                      </span>
                      ? You can also add a CC email below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      type="email"
                      placeholder="CC Email (optional)"
                      value={ccEmail}
                      onChange={(e) => setCcEmail(e.target.value)}
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={handleSendInvoice}
                      className="bg-green-600 text-white px-4 py-2 rounded-md w-full"
                    >
                      Confirm and Send
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Ship Now Button with Confirmation Dialog */}
              {order.status === "Pending" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-yellow-600 text-white px-4 py-2 rounded-md w-full flex items-center gap-2">
                      <Truck className="h-4 w-4" /> Ship Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Shipping</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to ship Order{" "}
                        <span className="text-green-500">
                          #{order.orderNumber}
                        </span>
                        ? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        onClick={handleShipOrder}
                        className="bg-yellow-600 text-white px-4 py-2 rounded-md w-full"
                      >
                        Confirm
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PDF Preview Section */}
      {pdfPreviewUrl && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">PDF Preview</h3>
          <embed
            src={pdfPreviewUrl}
            type="application/pdf"
            width="100%"
            height="600px"
          />
        </div>
      )}
    </div>
  );
}
