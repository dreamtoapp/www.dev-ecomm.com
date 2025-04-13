"use client"; // Mark this as a Client Component
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Mail, CheckSquare, Square, Loader2 } from "lucide-react"; // Added Loader2 for the spinner
import { useState } from "react";
import { sendBulkEmail } from "../actions/sendBulkEmail";
import { toast } from "sonner"; // Import toast for client-side notifications
import { deleteSubscriber } from "../actions/newsletter";
import { FaWhatsapp } from "react-icons/fa6";
import { FaSms } from "react-icons/fa";
import { Badge } from "@/components/ui/badge"; // Import Badge component

interface Subscriber {
  id: string;
  email: string;
  createdAt: Date;
}

export default function SubscriberTable({
  subscribers,
}: {
  subscribers: Subscriber[];
}) {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false); // State to track loading

  // Handle bulk email sending
  async function handleSendBulkEmail(formData: FormData) {
    setIsSending(true); // Start loading
    try {
      // Add selected emails to the form data
      selectedEmails.forEach((email) => {
        formData.append("selectedEmails", email);
      });
      const result = await sendBulkEmail(formData);
      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        toast.success(result.success);
      }
    } catch (error) {
      toast.error("فشل في إرسال البريد الإلكتروني");
    } finally {
      setIsSending(false); // Stop loading
    }
  }

  // Handle subscriber deletion
  async function handleDeleteSubscriber(id: string) {
    const result = await deleteSubscriber(id);
    if (result.error) {
      toast.error(result.error);
    } else if (result.success) {
      toast.success(result.success);
    }
  }

  // Select/Deselect All Checkboxes
  const toggleAllCheckboxes = (checked: boolean) => {
    const emails = checked ? subscribers.map((sub) => sub.email) : [];
    setSelectedEmails(emails);
  };

  // Handle WhatsApp/SMS button click (placeholder for now)
  const handleSendWhatsAppSMS = () => {
    if (selectedEmails.length === 0) {
      toast.error("يرجى اختيار مستلم واحد على الأقل");
      return;
    }
    toast.info("سيتم إضافة وظيفة إرسال WhatsApp/SMS قريبًا!");
  };

  return (
    <>
      {/* Bulk Email Form */}
      <form action={handleSendBulkEmail} className="mb-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center text-primary">
          إرسال منشور إلكتروني
        </h2>
        <div className="space-y-4">
          <Input
            name="subject"
            placeholder="العنوان"
            required
            className="w-full"
          />
          <textarea
            name="message"
            placeholder="الرسالة"
            rows={5}
            className="w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            required
          ></textarea>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <Button
              type="submit"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 transition-all flex items-center justify-center"
              disabled={isSending} // Disable button while loading
            >
              {isSending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> // Show spinner
              ) : (
                <Mail className="mr-2 h-4 w-4" />
              )}
              {isSending ? "جاري الإرسال..." : "إرسال البريد الإلكتروني"}
            </Button>
            <Button
              type="button"
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 transition-all flex items-center justify-center"
              onClick={handleSendWhatsAppSMS}
            >
              <FaWhatsapp className="mr-2 h-4 w-4" /> إرسال WhatsApp
            </Button>
            <Button
              type="button"
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 transition-all flex items-center justify-center"
              onClick={handleSendWhatsAppSMS}
            >
              <FaSms className="mr-2 h-4 w-4" /> إرسال SMS
            </Button>
          </div>
        </div>
      </form>

      {/* Select All / Deselect All Buttons */}
      <div className="flex justify-between items-center mt-4">
        {/* Left Side: Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => toggleAllCheckboxes(true)}
            aria-label="تحديد جميع المشتركين"
            className="flex items-center gap-2"
          >
            <CheckSquare className="h-4 w-4" /> تحديد الكل
          </Button>
          <Button
            variant="secondary"
            onClick={() => toggleAllCheckboxes(false)}
            aria-label="إلغاء تحديد جميع المشتركين"
            className="flex items-center gap-2"
          >
            <Square className="h-4 w-4" /> إلغاء التحديد
          </Button>
        </div>
        {/* Right Side: Badges */}
        <div className="flex gap-3">
          <Badge variant="secondary">عدد المشتركين: {subscribers.length}</Badge>
          <Badge className="bg-primary hover:bg-primary/90 text-white">
            {selectedEmails.length} مختار
          </Badge>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="rounded-md border overflow-hidden mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">تحديد</TableHead>
              <TableHead className="text-center">البريد الإلكتروني</TableHead>
              <TableHead className="text-center hidden md:table-cell">
                تاريخ الاشتراك
              </TableHead>
              <TableHead className="text-center">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers.map((subscriber) => (
              <TableRow key={subscriber.id}>
                <TableCell className="text-center">
                  <input
                    type="checkbox"
                    value={subscriber.email}
                    checked={selectedEmails.includes(subscriber.email)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedEmails([
                          ...selectedEmails,
                          subscriber.email,
                        ]);
                      } else {
                        setSelectedEmails(
                          selectedEmails.filter(
                            (email) => email !== subscriber.email
                          )
                        );
                      }
                    }}
                    className="w-4 h-4 accent-primary"
                  />
                </TableCell>
                <TableCell className="text-center font-medium">
                  {subscriber.email}
                </TableCell>
                <TableCell className="text-center hidden md:table-cell">
                  {new Date(subscriber.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center space-x-2">
                    {/* Delete Subscriber */}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteSubscriber(subscriber.id)}
                      className="bg-red-600 hover:bg-red-700 transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
