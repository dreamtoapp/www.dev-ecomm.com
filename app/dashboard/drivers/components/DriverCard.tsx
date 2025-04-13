"use client"; // Mark as a Client Component
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import EditDriverDialog from "./EditDriverDialog";
import DeleteDriverAlert from "./DeleteDriverAlert";
import { Pencil, Trash2 } from "lucide-react"; // Import Lucide icons for visual enhancement

interface DriverCardProps {
  driver: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    password?: string | null;
    imageUrl?: string | null;
  };
}

export default function DriverCard({ driver }: DriverCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden border border-border bg-background text-foreground">
      {/* Card Header */}
      <CardHeader className="p-4 bg-muted/50 border-b border-border">
        <CardTitle className="text-lg font-semibold text-primary line-clamp-1">
          {driver.name}
        </CardTitle>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="p-4 space-y-4">
        {/* Image */}
        <div className="w-full h-48 relative rounded-lg overflow-hidden bg-muted/20">
          {driver.imageUrl ? (
            <Image
              src={driver.imageUrl}
              alt={`${driver.name}'s profile`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-300 hover:scale-105"
              // onError={(e) => {
              //   e.currentTarget.src = "/default-driver.jpg"; // Fallback image
              // }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted/50">
              <span className="text-muted-foreground">No Image</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <strong className="font-medium">Email:</strong> {driver.email}
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <strong className="font-medium">Phone:</strong> {driver.phone}
          </p>
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="p-4 bg-muted/50 border-t border-border flex justify-between">
        {/* Edit Driver Dialog */}
        <EditDriverDialog driver={driver}>
          <button className="flex items-center gap-1 text-primary hover:underline">
            <Pencil className="h-4 w-4" /> Edit
          </button>
        </EditDriverDialog>

        {/* Delete Driver Alert */}
        <DeleteDriverAlert driverId={driver.id}>
          <button className="flex items-center gap-1 text-destructive hover:underline">
            <Trash2 className="h-4 w-4" /> Delete
          </button>
        </DeleteDriverAlert>
      </CardFooter>
    </Card>
  );
}
