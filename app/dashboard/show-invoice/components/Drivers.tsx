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
import { PersonStanding } from "lucide-react";


interface Driver {
  id: string;
  name: string;
}
interface SelectDriverProps {
  drivers: Driver[];
  selectedDriverId?: string;
  setSelectedDriverId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function Drivers({
  drivers,
  selectedDriverId,
  setSelectedDriverId,
}: SelectDriverProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center gap-2"><PersonStanding />
        <p>اختار السائق</p>
      </div>
      <Select
        value={selectedDriverId}
        onValueChange={(value) => setSelectedDriverId(value)}
      >
        <SelectTrigger className=" text-foreground">
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
    </div>
  );
}

