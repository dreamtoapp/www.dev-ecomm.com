import Link from '@/components/link';

export default function ProductNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-20 h-20 mx-auto mb-6 text-primary"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9 10h6M9 14h.01M15 14h.01" />
      </svg>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">المنتج غير موجود</h2>
      <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
        عذرًا، لم نعثر على المنتج المطلوب أو ربما تم حذفه.<br />
        يمكنك العودة لقائمة المنتجات والمحاولة مرة أخرى.
      </p>
      <Link
        href="/dashboard/products-control"
        className="inline-flex items-center px-8 py-3 bg-primary text-white rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          className="mr-2"
        >
          <path d="M3 12l9-9 9 9" />
          <path d="M9 21V9h6v12" />
        </svg>
        عودة للمنتجات
      </Link>
    </div>
  );
}
