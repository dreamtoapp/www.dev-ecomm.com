"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import dropdown components
import { Button } from "@/components/ui/button"; // Import button component
import { MoreVertical } from "lucide-react";
import DeleteSupplierAlert from "./DeleteSupplierAlert";
import EditSupplierDialog from "./EditSupplierDialog";
import React from "react";
interface EditSupplierDialogProps {
  supplier: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    logo: string | null; // Logo URL (optional)
    publicId: string | null; // Public ID (optional)
  };
}

function MoreAction({ supplier }: EditSupplierDialogProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* Edit Action */}
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <EditSupplierDialog supplier={supplier} />
        </DropdownMenuItem>

        {/* Delete Action */}
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <DeleteSupplierAlert supplierId={supplier.id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MoreAction;
