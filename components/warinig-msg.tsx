import { AlertCircle } from "lucide-react";

const EmptyState = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center h-screen bg-gray-50 px-4">
    <div className="text-center" dir="rtl">
      <AlertCircle className="h-12 w-12 md:h-16 md:w-16 text-red-500 mx-auto mb-3 md:mb-4" />
      <h1 className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">{message}</h1>
      <p className="text-gray-600 text-sm md:text-base">يرجى التأكد من المعرّف  أو المحاولة لاحقاً</p>
    </div>
  </div>
);

export default EmptyState;