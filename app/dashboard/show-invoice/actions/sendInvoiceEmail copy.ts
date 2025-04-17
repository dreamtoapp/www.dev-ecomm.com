"use server";
import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  orderNumber: string;
  cc?: string;
  orderId?: string;
}

// 🔹 تحويل `Blob` إلى `Buffer`


// 🔹 إنشاء وإرجاع كائن `nodemailer` لنقل البريد
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // `true` عند استخدام `port 465`
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// 🔹 إرسال الفاتورة عبر البريد الإلكتروني
export const sendInvoiceEmail = async ({
  to,
  orderNumber,
  cc,
  orderId

}: EmailOptions) => {
  try {
    const transporter = createTransporter();


    const mailOptions = {
      from: `"Amwag Co." <${process.env.EMAIL_USER}>`,
      to,
      cc, // Include CC if provided
      subject: `Invoice for Order #${orderNumber}`,
      text: `Dear customer,\n\nAttached is your invoice for Order #${orderNumber}.\n\nYou can view your order details here: ${process.env.BASE_URL}/orders/${orderId}\n\nThank you for your business!\n\nBest Regards,\nAmwag Co.`,
    };

    const info = await transporter.sendMail(mailOptions);
  } catch (error: any) {
    console.error(`❌ Error sending email to ${to}:`, error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
