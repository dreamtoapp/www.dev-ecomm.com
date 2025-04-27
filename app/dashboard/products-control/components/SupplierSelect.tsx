"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
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
  onAddSupplier?: () => void; // Optional callback to show add supplier dialog
}

export default function SupplierSelect({ value, onChange, onSupplierCount, onAddSupplier }: SupplierSelectProps) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [showImage, setShowImage] = useState(false);

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

  const selected = suppliers.find((s) => s.id === value);

  return (
    <div className="flex flex-row items-center gap-2 w-full h-12 max-w-full">
      {/* Supplier select and info fill the area, same height as filter */}
      <div className="flex flex-row items-center gap-1 flex-1 h-full min-w-0">
        <select
          className="input input-bordered min-w-[140px] h-10 text-sm"
          value={value || ""}
          onChange={(e) => onChange(e.target.value || null)}
          disabled={loading}
          style={{ height: '40px' }}
        >
          <option value="">-- اختر المورد --</option>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name} {supplier.type === "offer" ? "(عرض)" : "(مورد)"}
            </option>
          ))}
        </select>
        {/* Hint: Only show if no supplier is selected, not clickable, gentle guidance */}
        {!selected && (
          <p className="ml-2 text-xs text-muted-foreground whitespace-nowrap select-none">
            يرجى اختيار المورد لإكمال العملية
          </p>
        )}
        {/* Supplier info fills the remaining area */}
        {selected && (
          <div className="flex flex-row items-center gap-2 bg-white border border-muted rounded-lg px-2 py-1 min-w-0 flex-1 h-full overflow-x-auto">
            <span className="font-bold text-sm whitespace-nowrap">{selected.name}</span>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{selected.type === "offer" ? "عرض" : "مورد"}</span>
            {selected.logo && (
              <button
                className="hover:scale-105 transition p-0 m-0"
                title="عرض صورة المورد"
                onClick={() => setShowImage(true)}
                type="button"
                style={{ lineHeight: 0 }}
              >
                <Image
                  src={selected.logo}
                  alt={selected.name}
                  width={26}
                  height={26}
                  className="rounded-full border shadow-sm"
                  style={{ minWidth: 26, minHeight: 26 }}
                />
              </button>
            )}
            {showImage && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-lg shadow-lg p-4 relative">
                  <button className="absolute left-3 top-3 text-muted-foreground" onClick={() => setShowImage(false)}>
                    &times;
                  </button>
                  <Image
                    src={selected.logo!}
                    alt={selected.name}
                    width={180}
                    height={180}
                    className="rounded-xl border mx-auto"
                  />
                  <div className="text-center mt-2 text-sm">{selected.name}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
