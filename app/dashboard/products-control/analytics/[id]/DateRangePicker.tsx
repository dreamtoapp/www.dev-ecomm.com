"use client";
import React, { useState } from "react";

export default function DateRangePicker({ onChange }: { onChange: (from: string, to: string) => void }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-muted-foreground">من</label>
      <input type="date" value={from} onChange={e => { setFrom(e.target.value); onChange(e.target.value, to); }} className="border rounded px-2 py-1 text-xs" />
      <label className="text-xs text-muted-foreground">إلى</label>
      <input type="date" value={to} onChange={e => { setTo(e.target.value); onChange(from, e.target.value); }} className="border rounded px-2 py-1 text-xs" />
    </div>
  );
}
