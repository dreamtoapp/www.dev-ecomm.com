import BackButton from '../../../../components/BackButton';
import { fetchTrackInfo } from '../action/action';

export default async function Page({
  params,
}: {
  params: Promise<{ orderid: string }>;
}) {
  const { orderid } = await params;
  const trackInfo = await fetchTrackInfo(orderid);

  // Fallback coordinates if none provided
  const latitude = trackInfo?.latitude || 0;
  const longitude = trackInfo?.longitude || 0;

  // Construct Google Maps URL without API key
  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">
            رقم الطلبية: {trackInfo?.order.orderNumber || "غير متوفر"}
          </h1>
          <BackButton />
        </div>

        {/* Order Details */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">اسم العميل</span>
              <span className="font-medium text-gray-800">
                {trackInfo?.order.customerName || "غير محدد"}
              </span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-gray-500 text-sm">الإجمالي</span>
              <span className="font-medium text-gray-800">
                {trackInfo?.order.amount
                  ? `${trackInfo.order.amount} ريال`
                  : "غير محدد"}
              </span>
            </div>
          </div>

          <div className="flex flex-col bg-gray-50 p-4 rounded-lg">
            <span className="text-gray-500 text-sm">اسم السائق</span>
            <span className="font-medium text-gray-800">
              {trackInfo?.driver.name || "غير معين"}
            </span>
          </div>
        </div>


        {/* Map Section */}
        <div className="p-6 pt-0">
          <h2 className="text-gray-700 font-semibold mb-3">موقع التوصيل</h2>
          {latitude !== 0 && longitude !== 0 ? (
            <div className="relative w-full h-96 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={mapUrl}
                title="Delivery Location"
              />
            </div>
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 text-center">الموقع غير متوفر</p>
            </div>
          )}
          <div className="mt-3 text-center">
            <p className="text-sm text-gray-600">
              الإحداثيات:{" "}
              <span className="font-medium">
                {latitude !== 0 || longitude !== 0
                  ? `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
                  : "غير متوفرة"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
