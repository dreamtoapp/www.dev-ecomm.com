import Link from "next/link";
import { PackageX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductNotFound() {
  return (
    <div className="container py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-muted/30 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
          <PackageX className="h-12 w-12 text-muted-foreground" />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">المنتج غير موجود</h1>
        
        <p className="text-muted-foreground mb-8">
          عذراً، المنتج الذي تبحث عنه غير موجود أو ربما تمت إزالته.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              العودة للصفحة الرئيسية
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link href="/products">
              تصفح المنتجات
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
