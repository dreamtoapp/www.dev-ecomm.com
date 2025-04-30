import React from 'react';

interface SalesData { day: string; value: number; }

export default function SalesPieChart({ salesData, filterSummary }: { salesData: SalesData[]; filterSummary: string }) {
  const total = salesData.reduce((sum, d) => sum + d.value, 0) || 1;
  let cumulative = 0;
  const colors = ['#2563eb', '#60a5fa', '#818cf8', '#fbbf24', '#f87171', '#34d399', '#fb7185'];

  const slices = salesData.map((d, i) => {
    const start = (cumulative / total) * 2 * Math.PI;
    cumulative += d.value;
    const end = (cumulative / total) * 2 * Math.PI;
    const x1 = 80 + 70 * Math.sin(start);
    const y1 = 80 - 70 * Math.cos(start);
    const x2 = 80 + 70 * Math.sin(end);
    const y2 = 80 - 70 * Math.cos(end);
    const largeArc = end - start > Math.PI ? 1 : 0;
    const pathData = `M80,80 L${x1},${y1} A70,70 0 ${largeArc} 1 ${x2},${y2} Z`;
    return (
      <path
        key={i}
        d={pathData}
        fill={colors[i % colors.length]}
        stroke="#fff"
        strokeWidth={2}
      />
    );
  });

  return (
    <div className="w-full">
      <div className="text-center text-blue-800 font-semibold mb-2">{filterSummary}</div>
      <div className="flex flex-col items-center bg-blue-50 rounded-lg p-4">
        <svg width={160} height={160} viewBox="0 0 160 160">
          {slices}
        </svg>
        <div className="flex flex-wrap justify-center mt-2 gap-2">
          {salesData.map((d, i) => (
            <span key={i} className="flex items-center text-xs font-medium">
              <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ background: colors[i % colors.length] }}></span>
              {d.day}: {d.value.toLocaleString('ar-EG')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
