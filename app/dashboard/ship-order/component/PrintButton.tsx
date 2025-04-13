"use client";
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { format } from "date-fns";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  address?: string | null;
}

interface Shift {
  id: string;
  name: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  shift: Shift;
  items: OrderItem[];
  latitude: string | null;
  longitude: string | null;
  createdAt: Date;
  amount: number;
}

const PrintableContent: React.FC<{ order: Order }> = ({ order }) => (
  <div className="print-template">
    <header className="print-header">
      <h1>تفاصيل الطلب #{order.orderNumber}</h1>
      <div className="order-meta">
        <time>{format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}</time>
        <span className="order-total">
          المجموع: ر.س {order.amount.toFixed(2)}
        </span>
      </div>
    </header>

    <div className="grid-container">
      <section className="customer-info">
        <h2>معلومات العميل</h2>
        <div className="info-block">
          <p>
            <strong>الاسم:</strong> {order.customer.name}
          </p>
          <p>
            <strong>الهاتف:</strong> {order.customer.phone}
          </p>
          <p>
            <strong>العنوان:</strong> {order.customer.address || "غير متوفر"}
          </p>
        </div>
      </section>

      <section className="delivery-info">
        <h2>تفاصيل التوصيل</h2>
        <div className="info-block">
          <p>
            <strong>الوردية:</strong> {order.shift.name}
          </p>
          <p>
            <strong>الموقع:</strong>{" "}
            {order.latitude && order.longitude
              ? `${order.latitude}, ${order.longitude}`
              : "غير متوفر"}
          </p>
        </div>
      </section>
    </div>

    <table className="items-table">
      <thead>
        <tr>
          <th className="product">المنتج</th>
          <th className="quantity">الكمية</th>
          <th className="price">السعر</th>
        </tr>
      </thead>
      <tbody>
        {order.items.map((item) => (
          <tr key={item.id}>
            <td>{item.product.name}</td>
            <td>{item.quantity}</td>
            <td>ر.س {item.price.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <footer className="print-footer">
      <p>شكرًا لاختياركم</p>
      <p>تاريخ الطباعة: {format(new Date(), "dd/MM/yyyy HH:mm")}</p>
    </footer>
  </div>
);

const PrintOrderDetails: React.FC<{ order: Order }> = ({ order }) => {
  const printContentRef = useRef<HTMLDivElement>(null);
  const printWindow = useRef<Window | null>(null);

  useEffect(() => {
    return () => {
      if (printWindow.current) {
        printWindow.current.close();
      }
    };
  }, []);

  const handlePrint = () => {
    if (!printContentRef.current) return;

    const printStyles = `
      <style>
        @page { margin: 15mm; }
        body {
          font-family: 'Arial Arabic', Tahoma, sans-serif;
          direction: rtl;
          line-height: 1.5;
          color: #333;
        }
        .print-template {
          max-width: 210mm;
          margin: 0 auto;
          padding: 20px;
        }
        .print-header {
          text-align: center;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 2px solid #eee;
        }
        .order-meta {
          margin-top: 15px;
          display: flex;
          justify-content: space-between;
          font-size: 0.9em;
        }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
          margin-bottom: 30px;
        }
        .info-block p {
          margin: 8px 0;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        .items-table th,
        .items-table td {
          padding: 12px;
          border: 1px solid #ddd;
          text-align: right;
        }
        .items-table th {
          background-color: #f8f9fa;
          font-weight: 600;
        }
        .print-footer {
          margin-top: 30px;
          padding-top: 15px;
          border-top: 2px solid #eee;
          text-align: center;
          font-size: 0.9em;
        }
        @media print {
          .print-button { display: none; }
        }
      </style>
    `;

    try {
      printWindow.current = window.open("", "_blank");
      if (printWindow.current) {
        printWindow.current.document.write(`
          <html>
            <head>
              <title>طلب ${order.orderNumber}</title>
              <meta charset="UTF-8">
              ${printStyles}
            </head>
            <body>
              ${printContentRef.current.innerHTML}
            </body>
          </html>
        `);
        printWindow.current.document.close();

        // Delay print to ensure content loads
        setTimeout(() => {
          printWindow.current?.print();
        }, 300);
      }
    } catch (error) {
      console.error("Print error:", error);
      alert("حدث خطأ أثناء محاولة الطباعة. يرجى المحاولة مرة أخرى.");
    }
  };

  if (!order) {
    return (
      <div className="error-message">
        <p>تعذر العثور على بيانات الطلب</p>
      </div>
    );
  }

  return (
    <div>
      {/* Hidden print content */}
      <div
        ref={printContentRef}
        className="print-source"
        style={{
          position: "fixed",
          left: "-9999px",
          top: "-9999px",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <PrintableContent order={order} />
      </div>

      {/* Print button */}
      <Button
        onClick={handlePrint}
        className="print-button"
        variant="outline"
        size="sm"
      >
        <Printer className="icon" />
        طباعة الفاتورة
      </Button>
    </div>
  );
};

export default PrintOrderDetails;
