import db from "../../../../lib/prisma";
import { isValidObjectId } from "../../../../lib/isValidObjectId";

/**
 * جلب جميع المنتجات وتفاصيل المورد لمورد معين.
 */
export async function getProductsBySupplier(supplierId: string) {
  // استخدم الدالة المساعدة للتحقق من صحة معرف المورد
  if (!isValidObjectId(supplierId)) {
    return {
      success: false,
      message: "معرف المورد غير صالح.",
      data: null,
    };
  }
  try {
    const supplier = await db.supplier.findUnique({
      where: { id: supplierId },
      select: {
        id: true,
        name: true,
        slug: true,
        logo: true,
        publicId: true,
        email: true,
        phone: true,
        address: true,
        type: true,
        createdAt: true,
        updatedAt: true,
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            size: true,
            details: true,
            imageUrl: true,
            published: true,
          },
          orderBy: {
            name: 'asc'
          }
        },
        _count: {
          select: { products: true }
        }
      },
    });

    if (!supplier) {
      return {
        success: false,
        message: "المورد غير موجود.",
        data: null,
      };
    }

    return {
      success: true,
      data: supplier,
    };
  } catch (error: any) {
    console.error("حدث خطأ أثناء جلب المورد والمنتجات:", error.message);
    return {
      success: false,
      message: "فشل في جلب بيانات المورد والمنتجات.",
      data: null,
    };
  }
}
