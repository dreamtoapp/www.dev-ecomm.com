"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#2563eb", "#22c55e", "#f59e42", "#d946ef", "#f43f5e", "#0ea5e9"];

export default function AnalyticsChart({ salesByMonth, chartType }: { salesByMonth: { month: string, sales: number }[], chartType: string }) {
  if (chartType === 'line') {
    return (
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesByMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} angle={-30} textAnchor="end" />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => [value, "المبيعات"]} />
            <Legend verticalAlign="top" height={36} />
            <Line type="monotone" dataKey="sales" stroke="#2563eb" name="المبيعات" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  if (chartType === 'pie') {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <PieChart width={360} height={320}>
          <Pie data={salesByMonth} dataKey="sales" nameKey="month" cx="50%" cy="50%" outerRadius={100} label>
            {salesByMonth.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [value, "المبيعات"]} />
          <Legend />
        </PieChart>
      </div>
    );
  }
  // Default: bar
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={salesByMonth} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} angle={-30} textAnchor="end" />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => [value, "المبيعات"]} />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="sales" fill="#2563eb" name="المبيعات" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
