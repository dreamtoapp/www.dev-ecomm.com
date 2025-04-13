import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";

// Define Order Item Type
interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

// Define Order Type
interface Order {
  id: string;
  orderNumber: string;
  customerName?: string | null;
  amount: number;
  items: OrderItem[];
}

// Add a reusable header function
async function addHeader(doc: jsPDF, pageWidth: number, order: Order) {
  const logoPath = "/assets/pdflogo.jpg"; // Path relative to the public folder
  const logoWidth = 50; // Width of the logo in the PDF
  const logoHeight = 30; // Height of the logo in the PDF

  return new Promise<void>((resolve, reject) => {
    const imgData = new Image();
    imgData.src = logoPath;

    imgData.onload = () => {
      // Add the logo to the left side
      doc.addImage(imgData, "JPG", 14, 10, logoWidth, logoHeight);

      // Add the Cairo font

      // Add the invoice number to the right side
      doc.setFontSize(18);
      doc.text(`فاتورة #${order.orderNumber}`, pageWidth - 14, 20, {
        align: "right",
      });

      // Add company details below the logo
      doc.setFontSize(12);
      doc.text("Company Name: Amwag Co.", pageWidth - 14, 27, {
        align: "right",
      });
      doc.text("Email: support@amwag.com", pageWidth - 14, 34, {
        align: "right",
      });
      doc.text("Phone: +966 555 123 456", pageWidth - 14, 41, {
        align: "right",
      });

      resolve();
    };

    imgData.onerror = (error) => {
      console.error("Error loading logo:", error);
      reject(error);
    };
  });
}

// Add a reusable footer function
function addFooter(doc: jsPDF, pageWidth: number) {
  const totalPages = doc.getNumberOfPages(); // Get total number of pages
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i); // Set current page
    // Footer content
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(10);
    doc.text("Thank you for your business!", pageWidth / 2, pageHeight - 20, {
      align: "center",
    });
    doc.text("Amwag Co. © 2024", pageWidth / 2, pageHeight - 10, {
      align: "center",
    });
    // Page Number
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - 20, pageHeight - 10);
  }
}

// Add a reusable function to generate the order details section
function addOrderDetails(doc: jsPDF, order: Order) {
  doc.text(`Order Number: ${order.orderNumber}`, 14, 100);
  doc.text(`Customer: ${order.customerName || "Unknown"}`, 14, 110);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 120);
}

// Add a reusable function to generate the order items table
function addOrderItemsTable(doc: jsPDF, order: Order): number {
  const items = order.items.map((item, index) => [
    index + 1,
    item.productName,
    item.quantity,
    `${item.price.toFixed(2)} SAR`,
    `${(item.quantity * item.price).toFixed(2)} SAR`,
  ]);
  autoTable(doc, {
    startY: 130,
    head: [["#", "Product", "Qty", "Price", "Total"]],
    body: items,
  });
  return (doc as any).lastAutoTable.finalY || 150; // Return the Y position after the table
}

// Add a reusable function to generate the tax and total section
function addTaxAndTotal(doc: jsPDF, order: Order, startY: number): number {
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const tax = subtotal * 0.15;
  const total = subtotal + tax;
  doc.text(`Subtotal: ${subtotal.toFixed(2)} SAR`, 14, startY + 10);
  doc.text(`VAT (15%): ${tax.toFixed(2)} SAR`, 14, startY + 20);
  doc.setFontSize(14);
  doc.text(`Total Amount: ${total.toFixed(2)} SAR`, 14, startY + 35);
  return startY + 50; // Return the Y position after the totals
}

// Generate Invoice PDF
export async function generateInvoicePDF(order: Order): Promise<Blob> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Add Header (handle async)
  await addHeader(doc, pageWidth, order);

  // Add Order Details
  addOrderDetails(doc, order);

  // Add Order Items Table
  const lastTableY = addOrderItemsTable(doc, order);

  // Add Tax & Total Section
  const lastContentY = addTaxAndTotal(doc, order, lastTableY);

  // Add QR Code
  try {
    const qrCodeData = `https://amwag.com/orders/${order.id}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);
    doc.addImage(qrCodeImage, "PNG", pageWidth - 50, lastContentY, 40, 40);
  } catch (error) {
    console.error("Error generating QR Code:", error);
  }

  // Add Footer (for all pages)
  addFooter(doc, pageWidth);

  // Return as Blob instead of saving the file
  return new Promise((resolve) => {
    const pdfOutput = doc.output("blob"); // Generate PDF as Blob
    resolve(pdfOutput);
  });
}
