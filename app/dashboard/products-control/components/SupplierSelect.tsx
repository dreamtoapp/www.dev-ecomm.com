"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { fetchSuppliers } from "../actions/fetchSuppliers";

export interface Supplier {
  id: string;
  name: string;
  logo?: string;
  type?: string; // "supplier" or "offer"
}

interface SupplierSelectProps {
  value?: string | null;
  onChange: (id: string | null) => void;
  onSupplierCount?: (count: number) => void;
}

export default function SupplierSelect({ value, onChange, onSupplierCount }: SupplierSelectProps) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuppliers().then((data) => {
      setSuppliers(
        data.map((s) => ({
          ...s,
          logo: s.logo ?? undefined,
        }))
      );
      setLoading(false);
      if (onSupplierCount) onSupplierCount(data.length);
    });
  }, []);

  return (
    <div className="w-full max-w-xs">
      <label className="block mb-2 font-bold text-sm">اختر المورد</label>
      <select
        className="input input-bordered w-full"
        value={value || ""}
        onChange={(e) => onChange(e.target.value || null)}
        disabled={loading}
      >
        <option value="">-- اختر المورد --</option>
        {suppliers.map((supplier) => (
          <option key={supplier.id} value={supplier.id}>
            {supplier.name} {supplier.type === "offer" ? "(عرض)" : "(مورد)"}
          </option>
        ))}
      </select>
      {/* Custom preview below dropdown */}
      {value && (
        <div className="flex gap-2 items-center mt-2 bg-muted rounded p-2 border">
          {suppliers.find((s) => s.id === value)?.logo && (
            <Image
              src={suppliers.find((s) => s.id === value)?.logo!}
              alt={suppliers.find((s) => s.id === value)?.name || "logo"}
              width={32}
              height={32}
              className="rounded-full border"
            />
          )}
          <div>
            <div className="font-bold">{suppliers.find((s) => s.id === value)?.name}</div>
            <div className="text-xs text-muted-foreground">
              {suppliers.find((s) => s.id === value)?.type === "offer" ? "عرض" : "مورد"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
