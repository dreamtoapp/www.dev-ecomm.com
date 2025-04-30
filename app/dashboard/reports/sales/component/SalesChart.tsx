interface SalesData { day: string; value: number; }

export default function SalesChart({ salesData, filterSummary }: { salesData: SalesData[]; filterSummary: string }) {
  // Find the maximum value for scaling
  const maxValue = Math.max(...salesData.map(d => d.value), 1);
  return (
    <div className="w-full">
      <div className="text-center text-blue-800 font-semibold mb-2">{filterSummary}</div>
      <div className="w-full h-56 flex items-end gap-3 justify-between bg-blue-50 rounded-lg p-4 overflow-x-auto">
        {salesData.map((d, i) => (
          <div key={i} className="flex flex-col items-center w-full">
            {/* Value label above the bar */}
            <span className="text-xs font-bold text-blue-700 mb-1" aria-label={`قيمة المبيعات: ${d.value} ر.س`}>{d.value.toLocaleString('ar-EG')}</span>
            <div
              className="bg-blue-500 rounded-t-lg transition-all duration-300 shadow-md hover:bg-blue-600 focus:outline-none"
              style={{ height: `${(d.value / maxValue) * 140}px`, width: '28px' }}
              title={`${d.value.toLocaleString('ar-EG')} ر.س`}
              tabIndex={0}
              aria-label={`مبيعات يوم ${d.day}: ${d.value} ر.س`}
            ></div>
            <span className="text-xs mt-1 text-gray-700 font-medium">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
