import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-8 font-sans text-center">
      <div className="relative max-w-2xl p-12 bg-white/95 rounded-2xl shadow-xl overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-500/10 rounded-full" />

        {/* Animated X icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-32 h-32 mx-auto text-red-500 filter drop-shadow-[0_4px_8px_rgba(255,107,107,0.3)] animate-bounce-slow"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>

        {/* Content */}
        <h2 className="text-4xl text-gray-800 my-8 font-bold tracking-tight">
          404 - الصفحة غير موجودة
        </h2>

        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          عذرًا، يبدو أن الصفحة التي تبحث عنها قد أُزيلت أو غير موجودة
        </p>

        {/* Home button */}
        <Link
          href="/"
          className="inline-flex items-center px-8 py-4 bg-red-500 text-white rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-600 hover:shadow-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="ml-2"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}