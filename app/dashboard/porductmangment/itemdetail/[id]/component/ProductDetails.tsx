"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Package,
  Box,
  Info,
  Tag,
  Edit,
} from "lucide-react";
import { updateProduct } from "../actions/productActions";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"; // For notifications

interface Product {
  id: string;
  name: string;
  price: number;
  size?: string | null;
  details?: string | null;
  imageUrl?: string | null;
  supplier?: { name: string };
  published: boolean;
  outOfStock: boolean;
  updatedAt: Date;
}

export default function ProductDetails({ product }: { product: Product }) {
  const [published, setPublished] = useState(product.published);
  const [outOfStock, setOutOfStock] = useState(product.outOfStock);
  const [imageLoading, setImageLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price.toString(),
    size: product.size || "",
    details: product.details || "",
  });

  const handleAction = async (
    action: "publish" | "unpublish" | "stock" | "restock"
  ) => {
    try {
      switch (action) {
        case "publish":
          await updateProduct(product.id, { published: true });
          setPublished(true);
          break;
        case "unpublish":
          await updateProduct(product.id, { published: false });
          setPublished(false);
          break;
        case "stock":
          await updateProduct(product.id, { outOfStock: true });
          setOutOfStock(true);
          break;
        case "restock":
          await updateProduct(product.id, { outOfStock: false });
          setOutOfStock(false);
          break;
      }
    } catch (error) {
      console.error("حدث خطأ أثناء تنفيذ الإجراء:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      // Validate form data
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        toast.error("يرجى إدخال سعر صحيح.");
        return;
      }

      // Call server action to update product
      await updateProduct(product.id, {
        name: formData.name,
        price,
        size: formData.size || null,
        details: formData.details || null,
      });

      // Show success message
      toast.success("تم تحديث المنتج بنجاح.");

      // Exit edit mode
      setIsEditing(false);
    } catch (error) {
      toast.error("حدث خطأ أثناء تحديث المنتج.");
    }
  };

  return (
    <Card className="shadow-xl rounded-xl overflow-hidden bg-background max-w-4xl mx-auto  ">
      {/* Header */}
      <CardHeader className="p-6 bg-muted/40 border-b">
        <div className="flex items-center gap-3">
          <Box className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl font-bold tracking-tight line-clamp-1">
            {product.name}
          </CardTitle>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-6 grid gap-8 md:grid-cols-2">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden border">
            <AspectRatio ratio={16 / 9}>
              {imageLoading && <Skeleton className="h-full w-full" />}
              <img
                src={product.imageUrl || "/placeholder-product.jpg"}
                alt={product.name}
                className={`object-cover w-full h-full ${
                  imageLoading ? "hidden" : "block"
                }`}
                onLoad={() => setImageLoading(false)}
              />
            </AspectRatio>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={published ? "default" : "secondary"}
              className="gap-2 py-1.5 px-3 rounded-lg"
            >
              {published ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              {published ? "منشور" : "مسودة"}
            </Badge>
            <Badge
              variant={outOfStock ? "destructive" : "default"}
              className={cn(
                "gap-2 py-1.5 px-3 rounded-lg",
                !outOfStock &&
                  "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/30 dark:text-green-300"
              )}
            >
              <Package className="h-4 w-4" />
              {outOfStock ? "غير متوفر" : "متوفر"}
            </Badge>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          {/* Pricing */}
          <div className="bg-primary/5 p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <Tag className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">السعر</h3>
            </div>
            {isEditing ? (
              <Input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="السعر"
                className="w-full"
              />
            ) : (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">السعر</span>
                <span className="text-2xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Info className="h-5 w-5" />
              <h3 className="text-lg font-semibold">تفاصيل المنتج</h3>
            </div>

            <div className="grid gap-4">
              {/* Name */}
              <div className="flex justify-between">
                <span>اسم المنتج</span>
                {isEditing ? (
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="اسم المنتج"
                    className="w-full"
                  />
                ) : (
                  <span className="font-medium">{product.name}</span>
                )}
              </div>

              {/* Size */}
              {isEditing ? (
                <div className="flex justify-between">
                  <span>الحجم</span>
                  <Input
                    value={formData.size}
                    onChange={(e) =>
                      setFormData({ ...formData, size: e.target.value })
                    }
                    placeholder="الحجم"
                    className="w-full"
                  />
                </div>
              ) : (
                product.size && (
                  <div className="flex justify-between">
                    <span>الحجم</span>
                    <span className="font-medium">{product.size}</span>
                  </div>
                )
              )}

              {/* Supplier */}
              {product.supplier?.name && (
                <div className="flex justify-between">
                  <span>المورد</span>
                  <span className="font-medium">{product.supplier.name}</span>
                </div>
              )}

              {/* Last Updated */}
              <div className="flex justify-between">
                <span>آخر تحديث</span>
                <span className="font-medium">
                  {new Date(product.updatedAt).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          {isEditing ? (
            <Textarea
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
              placeholder="وصف المنتج"
              className="w-full"
            />
          ) : (
            product.details && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground">
                  الوصف
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.details}
                </p>
              </div>
            )
          )}
        </div>
      </CardContent>

      {/* Action Buttons */}
      <CardFooter className="p-6 border-t gap-3 flex flex-col sm:flex-row">
        <div className="flex-1 grid gap-2 grid-cols-4">
          {/* Publish/Unpublish Buttons */}
          {!published ? (
            <Button
              variant="outline"
              onClick={() => handleAction("publish")}
              className="h-11 gap-2 transition-all hover:bg-primary/20"
            >
              <CheckCircle className="h-4 w-4" /> نشر
            </Button>
          ) : (
            <Button
              variant="destructive"
              onClick={() => handleAction("unpublish")}
              className="h-11 gap-2 transition-all hover:bg-destructive/80"
            >
              <XCircle className="h-4 w-4" /> إيقاف النشر
            </Button>
          )}

          {/* Stock Status Buttons */}
          {!outOfStock ? (
            <Button
              variant="secondary"
              onClick={() => handleAction("stock")}
              className="h-11 gap-2 transition-all hover:bg-secondary/80"
            >
              <Package className="h-4 w-4" /> تعديل المخزون
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={() => handleAction("restock")}
              className="h-11 gap-2 transition-all hover:bg-primary/80"
            >
              <Package className="h-4 w-4" /> إعادة التخزين
            </Button>
          )}

          {/* Edit Mode Toggle */}
          <Button
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
            className="h-11 gap-2 transition-all hover:bg-primary/20"
          >
            <Edit className="h-4 w-4" />
            {isEditing ? "إلغاء التعديل" : "تعديل المنتج"}
          </Button>

          {/* Save Changes Button */}
          {isEditing && (
            <Button
              variant="default"
              onClick={handleUpdate}
              className="h-11 gap-2 transition-all hover:bg-primary/80"
            >
              حفظ التغييرات
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
