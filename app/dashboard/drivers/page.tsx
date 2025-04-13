import { notFound } from "next/navigation";
import DriverCard from "./components/DriverCard";
import AddDriverDialog from "./components/AddDriverDialog";
import { getDrivers } from "./actions/Actions";
import { Button } from "@/components/ui/button"; // Import Button from shadcn/ui
import { Plus } from "lucide-react"; // Import Lucide icon for visual enhancement

export default async function DriversPage() {
  const drivers = await getDrivers();

  if (!drivers) {
    notFound();
  }

  return (
    <div className="p-6 space-y-6 bg-background text-foreground">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-primary">ادارة السائقين</h1>

      {/* Add New Driver Button */}
      <div className="flex justify-end">
        <AddDriverDialog>
          <Button
            variant="default"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> اضافة سائق
          </Button>
        </AddDriverDialog>
      </div>

      {/* Driver List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.length > 0 ? (
          drivers.map((driver) => (
            <DriverCard key={driver.id} driver={driver} />
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground">
            لا يوجد سائقون متاحون. يرجى إضافة سائق جديد.
          </div>
        )}
      </div>
    </div>
  );
}
