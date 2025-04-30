import React from 'react';

interface SalesData { day: string; value: number; }

export default function SalesLineChart({ salesData, filterSummary }: { salesData: SalesData[]; filterSummary: string }) {
  // Calculate points for SVG polyline
  const maxValue = Math.max(...salesData.map(d => d.value), 1);
  const chartHeight = 140;
  const chartWidth = 260;
  const pointGap = chartWidth / (salesData.length - 1 || 1);
  const points = salesData.map((d, i) => `${i * pointGap},${chartHeight - (d.value / maxValue) * chartHeight}`).join(' ');

  return (
    <div className="w-full">
      <div className="text-center text-blue-800 font-semibold mb-2">{filterSummary}</div>
      <div className="flex flex-col items-center bg-blue-50 rounded-lg p-4">
        <svg width={chartWidth} height={chartHeight} className="overflow-visible">
          <polyline
            fill="none"
            stroke="#2563eb"
            strokeWidth="3"
            points={points}
          />
          {salesData.map((d, i) => (
            <circle
              key={i}
              cx={i * pointGap}
              cy={chartHeight - (d.value / maxValue) * chartHeight}
              r={5}
              fill="#2563eb"
            />
          ))}
        </svg>
        <div className="flex justify-between w-full mt-2">
          {salesData.map((d, i) => (
            <span key={i} className="text-xs text-gray-700 font-medium w-8 text-center">{d.day}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
