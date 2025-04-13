// components/Checkout/TermsDialog.tsx
"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  getTerms,
  Term,
} from "../../../dashboard/rulesandcondtions/actions/terms-actions";

export default function TermsDialog() {
  const [open, setOpen] = useState(false);
  const [terms, setTerms] = useState<Term[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTerms = async () => {
      if (open) {
        try {
          setLoading(true);
          const data = await getTerms();
          setTerms(data);
          setError("");
        } catch (err) {
          setError("فشل تحميل الشروط، يرجى المحاولة لاحقاً");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTerms();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0">
          الشروط والاحكام
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle>الشروط والأحكام وسياسة الخصوصية</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : (
          <div className="text-sm text-gray-700 space-y-2">
            {terms.map((term) => (
              <div key={term.id} className="p-4 bg-muted rounded-lg">
                <div className="text-xs text-muted-foreground text-left">
                  آخر تحديث: {new Date(term.updatedAt).toLocaleDateString()}
                </div>
                <div className="whitespace-pre-wrap text-foreground">
                  {term.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
