// SelectDriver.tsx
"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Dispatch } from "react";

interface Driver {
  id: string;
  name: string;
}
interface SelectDriverProps {
  drivers: Driver[];
  selectedDriverId?: string;
  setSelectedDriverId: React.Dispatch<React.SetStateAction<string>>;
}

export function SelectDriver({
  drivers,
  selectedDriverId,
  setSelectedDriverId,
}: SelectDriverProps) {
  return (
    <Select
      value={selectedDriverId}
      onValueChange={(value) => setSelectedDriverId(value)}
    >
      <SelectTrigger className="w-[300px] text-white">
        <SelectValue placeholder="اختر السائق" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>السائقون المتاحون</SelectLabel>
          {drivers.map((driver) => (
            <SelectItem key={driver.id} value={driver.id}>
              {driver.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
