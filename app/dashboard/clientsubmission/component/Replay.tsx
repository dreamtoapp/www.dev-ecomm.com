"use client";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { sendEmail } from "@/utils/sendEmail";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { createReply } from "../actions/action";
function ReplyDialog({ submission }: { submission: any }) {
  const [replyMessage, setReplyMessage] = useState("");
  const [replyingId, setReplyingId] = useState<string | null>(null);

  const handleReply = async () => {
    if (!replyingId || !replyMessage.trim()) return;

    try {
      // Create a reply (you will need to implement createReply on server)
      await createReply(replyingId, replyMessage);

      // Update local state (replies)
      // Assuming you're managing submission state client-side
      // await sendEmail to notify user of the reply
      await sendEmail({
        to: submission.email,
        subject: `Reply to your message: ${submission.subject}`,
        body: replyMessage,
      });

      toast.success("Reply sent successfully!");
      setReplyMessage("");
      setReplyingId(null);
    } catch (error) {
      toast.error("Failed to send reply.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Details for {submission.name}</DialogTitle>
          <DialogDescription>
            Subject: {submission.subject}
            <br />
            Message: {submission.message}
          </DialogDescription>
        </DialogHeader>

        {/* Display Replies */}
        <div className="space-y-2">
          <h3 className="font-semibold">Replies:</h3>
          {submission.replies.length > 0 ? (
            submission.replies.map((reply: any) => (
              <div
                key={reply.id}
                className="p-2 border rounded bg-gray-50 dark:bg-gray-900"
              >
                <p>{reply.content}</p>
                <small className="text-muted-foreground">
                  Sent at: {new Date(reply.sentAt).toLocaleString()}
                </small>
              </div>
            ))
          ) : (
            <p>No replies yet.</p>
          )}
        </div>

        {/* Reply Form */}
        <Textarea
          placeholder="Type your reply here..."
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
        />
        <DialogFooter>
          <Button onClick={handleReply} disabled={!replyMessage.trim()}>
            Send Reply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default ReplyDialog;
