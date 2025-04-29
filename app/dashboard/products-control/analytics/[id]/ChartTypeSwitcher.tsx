"use client";
import React from "react";

export default function ChartTypeSwitcher({ type, onTypeChange }: { type: string; onTypeChange: (type: string) => void }) {
  return (
    <div className="flex gap-2 items-center">
      <button type="button" className={`px-3 py-1 rounded border ${type === 'bar' ? 'bg-primary text-white' : 'bg-white text-primary border-primary'} transition`} onClick={() => onTypeChange('bar')}>
        عمودى
      </button>
      <button type="button" className={`px-3 py-1 rounded border ${type === 'line' ? 'bg-primary text-white' : 'bg-white text-primary border-primary'} transition`} onClick={() => onTypeChange('line')}>
        خطى
      </button>
      <button type="button" className={`px-3 py-1 rounded border ${type === 'pie' ? 'bg-primary text-white' : 'bg-white text-primary border-primary'} transition`} onClick={() => onTypeChange('pie')}>
        دائرى
      </button>
    </div>
  );
}
